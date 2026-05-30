import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatMYR } from "@/lib/utils";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  const delivery = subtotal > 0 ? (subtotal >= 200 ? 0 : 15) : 0;
  const total = subtotal + delivery;

  function handleCheckout() {
    toast.info("Payment coming soon!", {
      description: "We're working on it. Thank you for your patience!",
    });
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center animate-fade-in">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h1 className="font-display text-3xl mb-3">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Looks like you haven't added any bouquets yet.
        </p>
        <Button asChild>
          <Link to="/shop">Browse Bouquets</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="section-heading">Your Cart</h1>
        <button
          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          onClick={clearCart}
        >
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Line items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 bg-card border border-border rounded-xl p-4"
            >
              {/* Thumbnail */}
              <Link to={`/products/${product.slug}`} className="shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-24 object-cover rounded-lg"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/products/${product.slug}`}
                  className="font-display text-base font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                >
                  {product.name}
                </Link>
                <p className="text-xs text-muted-foreground mb-3">{product.category}</p>

                <div className="flex items-center justify-between">
                  {/* Qty controls */}
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      className="px-2 py-1 hover:bg-muted transition-colors disabled:opacity-40"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                    <button
                      className="px-2 py-1 hover:bg-muted transition-colors"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-sm text-primary">
                      {formatMYR(product.price * quantity)}
                    </p>
                    <button
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => removeItem(product.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h2 className="font-display text-lg font-semibold text-foreground mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatMYR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span>{delivery === 0 ? "Free" : formatMYR(delivery)}</span>
              </div>
              {delivery > 0 && (
                <p className="text-xs text-muted-foreground italic">
                  Free delivery on orders over RM 200
                </p>
              )}
              <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-base">
                <span>Total</span>
                <span className="text-primary">{formatMYR(total)}</span>
              </div>
            </div>

            <Button size="lg" className="w-full gap-2" onClick={handleCheckout}>
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Button>

            <Link
              to="/shop"
              className="block text-center text-xs text-muted-foreground hover:text-primary mt-4 transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
