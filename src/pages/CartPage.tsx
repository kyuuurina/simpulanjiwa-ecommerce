import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, SIZE_PRICES, WISH_CARD_PRICE } from "@/context/CartContext";
import { formatMYR } from "@/lib/utils";

const WA_NUMBER = "601159546069";

function buildWhatsAppMessage(items: ReturnType<typeof useCart>["items"], subtotal: number) {
  const lines: string[] = [];

  lines.push("🌸 *New Order – Simpulan Jiwa*");
  lines.push("");
  lines.push("*Order Details:*");

  items.forEach((item, i) => {
    const unitPrice = SIZE_PRICES[item.size] + (item.wishCard ? WISH_CARD_PRICE : 0);
    lines.push(`${i + 1}. ${item.product.name}`);
    lines.push(`   Size: ${item.size} | Qty: ${item.quantity} | ${formatMYR(unitPrice)} each`);
    if (item.wishCard) {
      lines.push(`   📝 Wish card: "${item.wishMessage}"`);
    }
  });

  lines.push("");
  lines.push(`*Subtotal: ${formatMYR(subtotal)}*`);
  lines.push("");
  lines.push("Please confirm availability and delivery details. Thank you! 🌷");

  return lines.join("\n");
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  function handleWhatsAppOrder() {
    const message = buildWhatsAppMessage(items, subtotal);
    const encoded = encodeURIComponent(message);
    window.open(
      `https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=${encoded}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center animate-fade-in">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h1 className="font-display text-3xl mb-3">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Looks like you haven't added any bouquets yet.
        </p>
        <Button asChild><Link to="/shop">Browse Bouquets</Link></Button>
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
          {items.map((item) => {
            const { product, quantity, size, wishCard, wishMessage } = item;
            const unitPrice = SIZE_PRICES[size] + (wishCard ? WISH_CARD_PRICE : 0);
            return (
              <div
                key={`${product.id}__${size}`}
                className="flex gap-4 bg-card border border-border rounded-xl p-4"
              >
                <Link to={`/products/${product.slug}`} className="shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-lg"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${product.slug}`}
                    className="font-display text-base font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {product.name}
                  </Link>

                  <div className="flex flex-wrap gap-2 mt-1 mb-2">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                      Size {size} · {formatMYR(SIZE_PRICES[size])}
                    </span>
                    {wishCard && (
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                        Wish card +RM1
                      </span>
                    )}
                  </div>

                  {wishCard && wishMessage && (
                    <p className="text-xs text-muted-foreground italic mb-2 line-clamp-2">
                      "{wishMessage}"
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        className="px-2 py-1 hover:bg-muted transition-colors disabled:opacity-40"
                        onClick={() => updateQuantity(product.id, size, quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                      <button
                        className="px-2 py-1 hover:bg-muted transition-colors"
                        onClick={() => updateQuantity(product.id, size, quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-sm text-primary">
                        {formatMYR(unitPrice * quantity)}
                      </p>
                      <button
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        onClick={() => removeItem(product.id, size)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h2 className="font-display text-lg font-semibold text-foreground mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm mb-5">
              {items.map((item) => {
                const unitPrice = SIZE_PRICES[item.size] + (item.wishCard ? WISH_CARD_PRICE : 0);
                return (
                  <div key={`${item.product.id}__${item.size}`} className="flex justify-between text-muted-foreground">
                    <span className="line-clamp-1 flex-1 pr-2">
                      {item.product.name} <span className="text-xs">({item.size}) ×{item.quantity}</span>
                    </span>
                    <span className="shrink-0">{formatMYR(unitPrice * item.quantity)}</span>
                  </div>
                );
              })}
              <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-base">
                <span>Subtotal</span>
                <span className="text-primary">{formatMYR(subtotal)}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
              Delivery details will be confirmed by our team after you place your order via WhatsApp.
            </p>

            <Button
              size="lg"
              className="w-full gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white border-0"
              onClick={handleWhatsAppOrder}
            >
              <MessageCircle className="w-5 h-5" />
              Order via WhatsApp
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
