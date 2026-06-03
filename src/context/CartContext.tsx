import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Product } from "@/data/products";

export type BouquetSize = "S" | "M" | "L" | "XK";

export const SIZE_PRICES: Record<BouquetSize, number> = {
  S: 109,
  M: 129,
  L: 159,
  XK: 179,
};

export interface CartItem {
  product: Product;
  quantity: number;
  size: BouquetSize;
  wishCard: boolean;
  wishMessage: string; // max 30 words
}

// Unique key per product+size combo
export function cartItemKey(productId: string, size: BouquetSize) {
  return `${productId}__${size}`;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; productId: string; size: BouquetSize }
  | { type: "UPDATE_QUANTITY"; productId: string; size: BouquetSize; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = cartItemKey(action.item.product.id, action.item.size);
      const existing = state.items.find(
        (i) => cartItemKey(i.product.id, i.size) === key
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            cartItemKey(i.product.id, i.size) === key
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (i) => cartItemKey(i.product.id, i.size) !== cartItemKey(action.productId, action.size)
        ),
      };
    case "UPDATE_QUANTITY": {
      const key = cartItemKey(action.productId, action.size);
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => cartItemKey(i.product.id, i.size) !== key) };
      }
      return {
        items: state.items.map((i) =>
          cartItemKey(i.product.id, i.size) === key ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case "CLEAR_CART":
      return { items: [] };
    case "LOAD_CART":
      return { items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size: BouquetSize, wishCard: boolean, wishMessage: string) => void;
  removeItem: (productId: string, size: BouquetSize) => void;
  updateQuantity: (productId: string, size: BouquetSize, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sj_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) dispatch({ type: "LOAD_CART", items: parsed });
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (
    product: Product,
    quantity: number,
    size: BouquetSize,
    wishCard: boolean,
    wishMessage: string
  ) => dispatch({ type: "ADD_ITEM", item: { product, quantity, size, wishCard, wishMessage } });

  const removeItem = (productId: string, size: BouquetSize) =>
    dispatch({ type: "REMOVE_ITEM", productId, size });

  const updateQuantity = (productId: string, size: BouquetSize, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", productId, size, quantity });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + (SIZE_PRICES[i.size] + (i.wishCard ? 5 : 0)) * i.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
