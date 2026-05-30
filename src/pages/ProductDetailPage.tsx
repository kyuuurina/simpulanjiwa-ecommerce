import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/data/products";
import { formatMYR } from "@/lib/utils";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug ?? "");
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl mb-4">Bouquet Not Found</h1>
        <p className="text-muted-foreground mb-8">This arrangement doesn't exist or may have been removed.</p>
        <Button asChild>
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  function handleAddToCart() {
    addItem(product!, qty);
    toast.success(`${product!.name} added to cart!`, {
      description: `${qty} × ${formatMYR(product!.price)}`,
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart"),
      },
    });
  }

  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      {/* Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-secondary">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <Badge variant="accent" className="w-fit mb-4">
            {product.category}
          </Badge>

          <h1 className="font-display text-3xl md:text-4xl text-foreground leading-tight mb-3">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-primary mb-6">
            {formatMYR(product.price)}
          </p>

          <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
            {product.description}
          </p>

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

          {/* Actions */}
          <div className="flex gap-3">
            <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-4"
              onClick={() => setWishlisted((w) => !w)}
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${wishlisted ? "fill-primary text-primary" : ""}`}
              />
            </Button>
          </div>

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
