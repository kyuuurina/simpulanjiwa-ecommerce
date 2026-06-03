import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart, type BouquetSize,  WISH_CARD_PRICE } from "@/context/CartContext";
import { getProductBySlug } from "@/data/products";
import { formatMYR } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const SIZES: BouquetSize[] = ["S", "M", "L", "XK"];

const MAX_WORDS = 30;

function countWords(text: string) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug ?? "");
  const { addItem } = useCart();

  const [qty, setQty]             = useState(1);
  const [size, setSize]           = useState<BouquetSize>("M");
  const [wishCard, setWishCard]   = useState(false);
  const [wishMsg, setWishMsg]     = useState("");

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl mb-4">Bouquet Not Found</h1>
        <p className="text-muted-foreground mb-8">This arrangement doesn't exist or may have been removed.</p>
        <Button asChild><Link to="/shop">Back to Shop</Link></Button>
      </div>
    );
  }

  const sizePrice  = product.sizePrices[size];
  const addOnPrice = wishCard ? WISH_CARD_PRICE : 0;
  const unitPrice  = sizePrice + addOnPrice;
  const wordCount  = countWords(wishMsg);

  function handleWishMsgChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    // Allow typing but clamp at 30 words — cut off extra words
    const words = val.split(/\s+/);
    if (words.length > MAX_WORDS && !val.endsWith(" ")) {
      setWishMsg(words.slice(0, MAX_WORDS).join(" "));
    } else {
      setWishMsg(val);
    }
  }

  function handleAddToCart() {
    if (wishCard && wordCount === 0) {
      toast.error("Please write your wish card message.");
      return;
    }
    addItem(product!, qty, size, wishCard, wishMsg.trim());
    toast.success(`${product!.name} added to cart!`, {
      description: `Size ${size} · ${qty} × ${formatMYR(unitPrice)}${wishCard ? " + wish card" : ""}`,
      action: { label: "View Cart", onClick: () => navigate("/cart") },
    });
  }

  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-secondary">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <Badge variant="accent" className="w-fit mb-4">{product.categories[0]}</Badge>

          <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-3">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-primary mb-1">
            {formatMYR(unitPrice)}
          </p>
          {wishCard && (
            <p className="text-xs text-muted-foreground mb-4">
              Includes wish card (+{formatMYR(WISH_CARD_PRICE)})
            </p>
          )}

          <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
            {product.description}
          </p>

          {/* Size picker */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((label) => (
                <button
                  key={label}
                  onClick={() => setSize(label)}
                  className={cn(
                    "flex flex-col items-center justify-center w-16 h-16 rounded-xl border-2 text-sm font-semibold transition-colors duration-150",
                    size === label
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary hover:text-primary"
                  )}
                >
                  <span className="text-base leading-none">{label}</span>
                  <span className="text-[10px] font-normal opacity-80 mt-0.5">{formatMYR(product.sizePrices[label])}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Wish card add-on */}
          <div className="mb-6 p-4 rounded-xl border border-border bg-background">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={wishCard}
                onChange={(e) => {
                  setWishCard(e.target.checked);
                  if (!e.target.checked) setWishMsg("");
                }}
                className="w-4 h-4 accent-[#5C1D20] cursor-pointer"
              />
              <div>
                <p className="text-sm font-medium text-foreground">Add Wish Card</p>
                <p className="text-xs text-muted-foreground">+{formatMYR(WISH_CARD_PRICE)} · Handwritten message included</p>
              </div>
            </label>

            {wishCard && (
              <div className="mt-4">
                <textarea
                  value={wishMsg}
                  onChange={handleWishMsgChange}
                  placeholder="Write your message here…"
                  rows={3}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
                <p className={cn(
                  "text-xs mt-1 text-right",
                  wordCount >= MAX_WORDS ? "text-destructive font-medium" : "text-muted-foreground"
                )}>
                  {wordCount}/{MAX_WORDS} words
                </p>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-foreground">Quantity</span>
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                className="px-3 py-2 hover:bg-muted transition-colors disabled:opacity-40"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-sm font-semibold">{qty}</span>
              <button
                className="px-3 py-2 hover:bg-muted transition-colors disabled:opacity-40"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                disabled={qty >= product.stock}
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-muted-foreground">{product.stock} available</span>
          </div>

          {/* Add to cart */}
          <Button size="lg" className="w-full gap-2" onClick={handleAddToCart}>
            <ShoppingBag className="w-5 h-5" />
            Add to Cart · {formatMYR(unitPrice * qty)}
          </Button>

          {/* Trust signals */}
          <div className="mt-8 pt-6 border-t border-border space-y-2 text-xs text-muted-foreground">
            <p>🌸 Same-day delivery available (order before 12pm)</p>
            <p>📦 Elegant gift wrapping included</p>
            <p>🔄 Remake guarantee if not satisfied</p>
          </div>
        </div>
      </div>
    </div>
  );
}
