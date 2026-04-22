import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";
import { HEADER_NAV_LINKS, ROUTE_PATHS } from "@/consts/navigation";
import { CONTACT_PHONE_URL } from "@/consts/contact";

interface HeaderProps {
  onOpenPanel: () => void;
}

export function Header({ onOpenPanel }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-2xl transition-all duration-500 px-5 py-3",
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm border border-border/40"
          : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between">
        <Link to={ROUTE_PATHS.HOME} className="flex items-center" aria-label="Accueil VentiPure">
          <BrandLogo className="h-11 max-w-[132px] sm:h-12 sm:max-w-[144px]" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {HEADER_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link to={ROUTE_PATHS.CONTACT} className="hidden md:inline-flex">
            <Button variant="default" size="sm">Soumission gratuite</Button>
          </Link>

          {/* Mobile phone button */}
          <a
            href={CONTACT_PHONE_URL}
            className="md:hidden p-2.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Appeler VentiPure"
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>

          <button
            onClick={onOpenPanel}
            className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Menu"
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
