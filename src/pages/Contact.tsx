import { useState, useEffect, useMemo } from "react"; // useMemo kept for initialServices
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Send, Check, Sparkles } from "lucide-react";
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
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((opt) => {
                    const active = selectedServices.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleService(opt.id)}
                        className={`group inline-flex items-center gap-2 h-11 pl-4 pr-4 rounded-full text-sm font-medium border transition-all duration-200 ${
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
                        Estimation en temps réel
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
                            <Sparkles className="h-3.5 w-3.5" />
                            Rabais combo favori
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

                      {quote.hasCombo && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 text-xs font-medium text-primary"
                        >
                          Félicitations, vous économisez {COMBO_DISCOUNT} $ avec le combo favori.
                        </motion.p>
                      )}

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
              className="mt-16 pt-10 border-t border-border/60"
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
