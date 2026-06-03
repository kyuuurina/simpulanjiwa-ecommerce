import { Link } from "react-router-dom";
import { Mail, ExternalLink, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/images/sj-logo.jpg"
                alt="Simpulan Jiwa"
                className="w-8 h-8 rounded-full object-cover border border-border"
              />
              <span className="font-display text-base font-semibold text-foreground">Simpulan Jiwa</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Flowers that tie hearts closer.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/about", label: "About Us" },
                { to: "/cart", label: "My Cart" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Connect</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://instagram.com/simpulanjiwa"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> @simpulanjiwa
                </a>
              </li>
              <li>
                <a
                  href="mailto:simpulanjiwa@gmail.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" /> simpulanjiwa@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=601159546069"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" /> +60 11-5954 6069
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Simpulan Jiwa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
