import { Link } from "react-router-dom";
import { Mail, ExternalLink, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/sj-logo.jpg"
                alt="Simpulan Jiwa"
                className="w-10 h-10 rounded-full object-cover border-2 border-brand-secondary"
              />
              <span className="font-display text-xl font-semibold">Simpulan Jiwa</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              Flowers that tie hearts closer. A floral experience brand crafting bespoke bouquets
              for life's most meaningful moments — weddings, celebrations, farewells, and everything
              in between.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <a
                href="https://api.whatsapp.com/send/?phone=601159546069"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-secondary shrink-0" />
                +60 11-5954 6069
              </a>
              <a
                href="mailto:simpulanjiwa@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-secondary shrink-0" />
                simpulanjiwa@gmail.com
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                Casa Wood Cybersouth, Jln CW 1,<br />43800 Dengkil, Selangor
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-brand-secondary mb-4 uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/about", label: "About Us" },
                { to: "/cart", label: "My Cart" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-display text-sm font-semibold text-brand-secondary mb-4 uppercase tracking-widest">
              Follow Us
            </h4>
            <a
              href="https://instagram.com/simpulanjiwa"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> @simpulanjiwa
            </a>
          </div>

        </div>

        {/* Divider + bottom line */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Simpulan Jiwa. All rights reserved.</span>
          <span className="font-display italic text-white/30">Flowers that tie hearts closer.</span>
        </div>
      </div>
    </footer>
  );
}
