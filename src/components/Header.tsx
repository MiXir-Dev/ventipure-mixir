import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Contact", href: "/contact" },
];

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
        <Link to="/" className="text-lg font-bold tracking-tight text-foreground">
          Venti<span className="text-primary">Pure</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
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
          <Link to="/contact" className="hidden md:inline-flex">
            <Button variant="default" size="sm">Soumission gratuite</Button>
          </Link>

          {/* Mobile phone button */}
          <a
            href="tel:4389952291"
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
