import { Link } from "react-router-dom";
import { ArrowRight, Flower, Star, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";

const featured = getFeaturedProducts();

const perks = [
  {
    icon: Flower,
    title: "Fresh Daily",
    desc: "Sourced from local farms every morning for peak freshness.",
  },
  {
    icon: Truck,
    title: "Same-Day Delivery",
    desc: "Order before 12pm and receive your bouquet today.",
  },
  {
    icon: Star,
    title: "Handcrafted",
    desc: "Each arrangement is lovingly made by our in-house florists.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "Not satisfied? We'll remake it — no questions asked.",
  },
];

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[hsl(var(--cream))]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/landing.JPG"
            alt="Simpulan Jiwa studio"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay for text legibility */}
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <p className="text-brand-secondary text-sm font-sans tracking-widest uppercase mb-4">
              Handcrafted Florals · Kuala Lumpur
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Flowers That{" "}
              <em className="text-brand-secondary not-italic">Speak</em> From
              the Heart
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Simpulan Jiwa ("ties of the soul") creates bespoke bouquets for every chapter of
              your life — weddings, celebrations, quiet gifts, and everything in between.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild className="bg-brand-primary hover:bg-brand-primary/90 text-white border-0">
                <Link to="/shop">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-brand-primary">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Perks bar */}
      <section className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <Icon className="w-6 h-6 shrink-0 opacity-80" />
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs opacity-75 leading-snug hidden md:block">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary text-xs tracking-widest uppercase font-sans mb-2">Handpicked for You</p>
            <h2 className="section-heading">Featured Bouquets</h2>
          </div>
          <Link
            to="/shop"
            className="text-sm text-primary hover:underline font-sans flex items-center gap-1 hidden md:flex"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* About blurb */}
      <section className="bg-[hsl(var(--blush))] py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://picsum.photos/seed/florist-studio/800/600"
                alt="Our studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-primary text-xs tracking-widest uppercase font-sans mb-3">About Us</p>
              <h2 className="section-heading mb-4">Rooted in Love, Bloomed with Purpose</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
                Simpulan Jiwa was born out of a simple belief: that flowers are not just decorations —
                they are messengers of emotion. Founded in the heart of Kuala Lumpur, we source only
                the freshest blooms and craft each bouquet with intention and artistry.
              </p>
              <Button variant="outline" asChild>
                <Link to="/about">Read Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://picsum.photos/seed/cta-pattern/1200/400"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl mb-4">Send a Bouquet Today</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto text-sm md:text-base">
              Same-day delivery available across Klang Valley. Make someone's day extraordinary.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/shop">
                Browse the Shop <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
