import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatMYR } from "@/lib/utils";
import { SIZE_PRICES } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.slug}`} className="group block">
      <div className="product-card">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/5]">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground text-xs">
              {product.category}
            </Badge>
          </div>
          {/* View product overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button size="sm" className="w-full gap-2" tabIndex={-1}>
              <ShoppingBag className="w-4 h-4" />
              Select Size
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-display text-base font-medium text-foreground leading-snug mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-primary font-semibold text-sm">
            From {formatMYR(SIZE_PRICES.S)}
          </p>
        </div>
      </div>
    </Link>
  );
}
