import { Link } from "react-router-dom";
import { Phone, MapPin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="vp-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="text-xl font-bold mb-4 text-foreground">
              Venti<span className="text-primary">Pure</span>
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Service professionnel de nettoyage de ventilation résidentielle au Québec.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {[
                { label: "Accueil", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Tarifs", href: "/tarifs" },
                { label: "Équipement", href: "/equipement" },
                { label: "Nos secteurs", href: "/nos-services-et-secteurs" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-4">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary/60" />
                <span>2151, rue Leonardo da Vinci<br />Sainte-Julie, Québec<br />J3E 1Z3</span>
              </li>
              <li>
                <a href="tel:4389952291" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-primary/60" />
                  438-995-2291
                </a>
              </li>
              <li>
                <a href="mailto:info@ventipure.ca" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-primary/60" />
                  info@ventipure.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} VentiPure. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
