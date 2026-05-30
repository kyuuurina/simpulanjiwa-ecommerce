import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { products, categories, type Category } from "@/data/products";
import { cn } from "@/lib/utils";

const ALL = "All" as const;
type FilterTab = typeof ALL | Category;

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<FilterTab>(ALL);
  const [query, setQuery] = useState("");

  const tabs: FilterTab[] = [ALL, ...categories];

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === ALL || p.category === activeCategory;
    const matchQuery =
      query.trim() === "" ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      {/* Page header */}
      <div className="text-center mb-10">
        <p className="text-primary text-xs tracking-widest uppercase font-sans mb-2">Our Collection</p>
        <h1 className="section-heading mb-3">Shop Bouquets</h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Browse our full range of handcrafted floral arrangements for every occasion and budget.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search bouquets…"
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-sans font-medium border transition-colors duration-200",
              activeCategory === tab
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="font-display text-xl mb-2">No bouquets found</p>
          <p className="text-sm">Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}
