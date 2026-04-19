import { useState, useEffect, useMemo } from "react"; // useMemo kept for initialServices
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, COMBO_PRESETS, COMBO_DISCOUNT } from "@/config/services";
import { useQuote } from "@/hooks/useQuote";

const serviceOptions = SERVICES;

const Contact = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const initialServices = useMemo(() => {
    const combo = searchParams.get("combo");
    if (combo && COMBO_PRESETS[combo]) return COMBO_PRESETS[combo];
    const single = searchParams.get("service");
    return single ? [single] : [];
  }, [searchParams]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    message: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>(initialServices);
  const [contactError, setContactError] = useState(false);

  useEffect(() => {
    setSelectedServices(initialServices);
  }, [initialServices]);

  const toggleService = (value: string) => {
    setSelectedServices((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const quote = useQuote(selectedServices);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() && !formData.phone.trim()) {
      setContactError(true);
      return;
    }
    setContactError(false);
    // submission logic
  };

  const inputClass =
    "w-full h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="vp-container max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 md:mb-16"
            >
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                Contact
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                Demandez votre soumission
              </h1>
              <p className="text-muted-foreground text-[15px] max-w-md">
                Remplissez le formulaire et nous vous répondons rapidement. Service résidentiel et commercial à Montréal, Laval, Longueuil, Sainte-Julie et la Rive-Sud.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Row 1: Nom + Courriel */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Nom complet <span className="text-muted-foreground/60 normal-case tracking-normal">(optionnel)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                    placeholder="Jean Tremblay"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Courriel
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (contactError && (e.target.value.trim() || formData.phone.trim())) {
                        setContactError(false);
                      }
                    }}
                    className={`${inputClass} ${contactError ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                    placeholder="votre@courriel.com"
                  />
                </div>
              </div>

              {/* Row 2: Adresse + Téléphone */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Adresse <span className="text-muted-foreground/60 normal-case tracking-normal">(optionnel)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={inputClass}
                    placeholder="123 rue Exemple, Montréal"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (contactError && (e.target.value.trim() || formData.email.trim())) {
                        setContactError(false);
                      }
                    }}
                    className={`${inputClass} ${contactError ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}`}
                    placeholder="438-000-0000"
                  />
                </div>
              </div>

              <AnimatePresence>
                {contactError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs text-destructive font-medium"
                  >
                    Veuillez laisser au moins un moyen de contact (courriel ou téléphone).
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Multi-select services */}
              <div className="pt-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
                  Services souhaités
                  <span className="ml-2 normal-case tracking-normal text-muted-foreground/60">
                    (sélectionnez un ou plusieurs)
                  </span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {serviceOptions.map((opt) => {
                    const active = selectedServices.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleService(opt.id)}
                        className={`group flex w-full items-center gap-2 h-11 pl-4 pr-4 rounded-full text-sm font-medium border transition-all duration-200 ${
                          active
                            ? "bg-primary text-primary-foreground border-primary shadow-[var(--vp-shadow-soft)]"
                            : "bg-background text-foreground border-border hover:border-primary/50 hover:text-primary"
                        }`}
                        aria-pressed={active}
                      >
                        <span
                          className={`flex items-center justify-center h-4 w-4 rounded-full border transition-colors ${
                            active
                              ? "bg-primary-foreground border-primary-foreground text-primary"
                              : "border-border group-hover:border-primary/60"
                          }`}
                        >
                          {active && <Check className="h-3 w-3" strokeWidth={3} />}
                        </span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live quote */}
              <AnimatePresence>
                {quote.selected.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl border border-border bg-muted/30 p-5 md:p-6">
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.18em] mb-4">
                        Estimation
                      </p>

                      <ul className="space-y-2.5 mb-4">
                        {quote.selected.map((s) => (
                          <li
                            key={s.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-foreground/85">{s.label}</span>
                            <span className="font-semibold text-foreground tabular-nums">
                              {s.price !== null ? `${s.price} $` : "Sur estimation"}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {quote.hasCombo && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-between text-sm pt-3 border-t border-border/60 mb-3"
                        >
                          <span className="inline-flex items-center gap-1.5 text-primary font-semibold">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 64 64"
                              xmlSpace="preserve"
                              className="h-4 w-4 shrink-0"
                              aria-hidden="true"
                            >
                              <g>
                                <path
                                  d="M57.274 6.725c-1.356-1.356-3.366-1.556-5.228-1.09-1.862.465-3.742 1.575-5.378 3.212s-2.747 3.515-3.213 5.378c-.465 1.862-.265 3.872 1.091 5.228a1.5 1.5 0 1 0 2.122-2.121c-.401-.401-.605-1.17-.303-2.38.019-.073.057-.155.079-.23l1.345.072c.777.042 1.375.64 1.417 1.417l.841 15.422c.023.426-.136.84-.438 1.142L27.222 55.162a1.478 1.478 0 0 1-2.121 0L8.838 38.9a1.478 1.478 0 0 1 0-2.122L31.225 14.39a1.498 1.498 0 0 1 1.142-.438l7.945.436a1.5 1.5 0 1 0 .163-2.997l-7.944-.434a4.505 4.505 0 0 0-3.428 1.312L6.716 34.656c-1.745 1.745-1.745 4.62 0 6.364L22.98 57.284c1.744 1.744 4.619 1.744 6.364 0L51.73 34.896a4.505 4.505 0 0 0 1.312-3.427l-.841-15.423a4.49 4.49 0 0 0-1.316-2.932 4.49 4.49 0 0 0-2.841-1.302c.23-.286.47-.57.744-.844 1.293-1.292 2.775-2.122 3.984-2.424 1.21-.302 1.979-.098 2.38.303.351.351.548.956.39 1.946-.157.989-.706 2.245-1.637 3.433a1.5 1.5 0 1 0 2.36 1.852c1.198-1.529 1.98-3.185 2.24-4.814.26-1.63-.043-3.35-1.232-4.539z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth={0.65}
                                />
                              </g>
                            </svg>
                            Rabais
                          </span>
                          <span className="font-semibold text-primary tabular-nums">
                            −{COMBO_DISCOUNT} $
                          </span>
                        </motion.div>
                      )}

                      {quote.numericItems.length > 0 && (
                        <div className="flex items-baseline justify-between pt-3 border-t border-border/60">
                          <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                            Total estimé
                          </span>
                          <div className="flex items-baseline gap-2">
                            {quote.hasCombo && (
                              <span className="text-sm text-muted-foreground line-through tabular-nums">
                                {quote.subtotal} $
                              </span>
                            )}
                            <span className="text-2xl font-extrabold text-foreground tabular-nums">
                              {quote.total} $
                            </span>
                          </div>
                        </div>
                      )}
{/* 
                      {quote.hasCombo && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 text-xs font-medium text-primary"
                        >
                          Félicitations, vous économisez {COMBO_DISCOUNT} $ avec le combo favori.
                        </motion.p>
                      )} */}

                      {quote.needsEstimate && (
                        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                          Estimation personnalisée requise pour les services commerciaux ou personnalisés. Nous vous contacterons rapidement.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message */}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                  Message <span className="text-muted-foreground/60 normal-case tracking-normal">(optionnel)</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none"
                  placeholder="Décrivez vos besoins (nombre de sorties, type de domicile, etc.)"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="default" size="lg" className="w-full sm:w-auto">
                  Envoyer la demande
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 pt-10 border-t border-border/60"
            >
              <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm text-muted-foreground">
                <a href="tel:4389952291" className="hover:text-foreground transition-colors">
                  438-995-2291
                </a>
                <a href="mailto:info@ventipure.ca" className="hover:text-foreground transition-colors">
                  info@ventipure.ca
                </a>
                <span>Sainte-Julie, Québec</span>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
