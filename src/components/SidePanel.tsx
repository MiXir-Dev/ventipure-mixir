import { X, Sun, Moon, Monitor, Mail, Instagram, Facebook } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
}

type ThemeMode = "light" | "dark" | "system";

const headerLinks = ["/", "/tarifs", "/contact"];

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Équipement", href: "/equipement" },
  { label: "Contact", href: "/contact" },
  { label: "Nos secteurs", href: "/nos-services-et-secteurs" },
];

export function SidePanel({ open, onClose }: SidePanelProps) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [email, setEmail] = useState("");
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("vp-theme") as ThemeMode | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("vp-theme", theme);
  }, [theme]);

  const themeOptions: { value: ThemeMode; icon: typeof Sun; label: string }[] = [
    { value: "light", icon: Sun, label: "Clair" },
    { value: "dark", icon: Moon, label: "Sombre" },
    { value: "system", icon: Monitor, label: "Système" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-[70] h-full w-full bg-background border-l border-border/50 shadow-2xl transition-transform duration-300 ease-out flex flex-col",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6">
          <span className="text-lg font-bold tracking-tight text-foreground">
            Venti<span className="text-primary">Pure</span>
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Navigation */}
          <nav className="px-8 pb-8">
            <ul className="space-y-1">
              {navLinks
                .filter((link) => {
                  if (typeof window !== "undefined" && window.innerWidth >= 768) {
                    return !headerLinks.includes(link.href);
                  }
                  return true;
                })
                .map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className={cn(
                      "block py-3 text-[15px] font-medium transition-colors border-b border-border/30 last:border-0",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="mx-8 border-t border-border/50" />

          {/* Preferences section */}
          <div className="px-8 pt-8 pb-6 space-y-8">

            {/* Theme toggle */}
            <div>
              <p className="text-xs text-muted-foreground mb-3">Apparence</p>
              <div className="flex gap-1 bg-muted/50 rounded-xl p-1">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all",
                      theme === opt.value
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <opt.icon className="h-3.5 w-3.5" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-xs text-muted-foreground mb-3">Suivez-nous</p>
              <div className="flex gap-2">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                    aria-label={s.label}
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-auto px-8 pb-8">
            <div className="border-t border-border/50 pt-8">
              <p className="text-sm font-medium text-foreground mb-1">
                Besoin d'un nettoyage?
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Demandez votre estimation sans engagement.
              </p>
              <Link
                to="/contact"
                onClick={onClose}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Nous contacter →
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
