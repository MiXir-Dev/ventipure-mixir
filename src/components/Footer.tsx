import { Link } from "react-router-dom";
import { Phone, MapPin, Mail } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { FOOTER_NAV_LINKS } from "@/consts/navigation";
import {
  CONTACT_ADDRESS_FULL,
  CONTACT_EMAIL,
  CONTACT_EMAIL_URL,
  CONTACT_MAPS_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_URL,
} from "@/consts/contact";
import { ROUTE_PATHS } from "@/consts/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="vp-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <BrandLogo className="mb-4 h-24 max-w-[180px]" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Service professionnel de nettoyage de ventilation résidentielle au Québec.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {FOOTER_NAV_LINKS.map((link) => (
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
              <li>
                <a
                  href={CONTACT_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-primary/60" />
                  <span>{CONTACT_ADDRESS_FULL}</span>
                </a>
              </li>
              <li>
                <a href={CONTACT_PHONE_URL} className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-primary/60" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={CONTACT_EMAIL_URL} className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-primary/60" />
                  {CONTACT_EMAIL}
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
            <Link
              to={ROUTE_PATHS.POLITIQUE_CONFIDENTIALITE}
              className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link
              to={ROUTE_PATHS.MODALITES_UTILISATION}
              className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
