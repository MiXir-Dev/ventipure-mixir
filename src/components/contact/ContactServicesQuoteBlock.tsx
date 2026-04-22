import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { COMBO_DISCOUNT, COMBO_SERVICES, SERVICES } from "@/consts/services";
import type { Quote } from "@/hooks/useQuote";

type ContactServicesQuoteBlockProps = {
  selectedServices: string[];
  hasServicesError: boolean;
  quote: Quote;
  onToggleService: (serviceId: string) => void;
};

export function ContactServicesQuoteBlock({
  selectedServices,
  hasServicesError,
  quote,
  onToggleService,
}: ContactServicesQuoteBlockProps) {
  const [isComboUpsellDismissed, setIsComboUpsellDismissed] = useState(false);

  const selectedComboCount = useMemo(
    () => COMBO_SERVICES.filter((id) => selectedServices.includes(id)).length,
    [selectedServices],
  );

  const missingComboService = useMemo(
    () =>
      selectedComboCount === 1
        ? SERVICES.find(
            (service) =>
              COMBO_SERVICES.includes(service.id) && !selectedServices.includes(service.id),
          )
        : null,
    [selectedComboCount, selectedServices],
  );

  useEffect(() => {
    setIsComboUpsellDismissed(false);
  }, [selectedServices]);

  return (
    <>
      <div className="pt-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
          Services souhaités
        </label>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-2 ${
            hasServicesError ? "rounded-xl border border-destructive/60 p-2" : ""
          }`}
        >
          {SERVICES.map((service) => {
            const active = selectedServices.includes(service.id);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onToggleService(service.id)}
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
                {service.label}
              </button>
            );
          })}
        </div>
      </div>

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
                {quote.selected.map((service) => (
                  <li key={service.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground/85">{service.label}</span>
                    <span className="font-semibold text-foreground tabular-nums">
                      {service.price !== null ? `${service.price} $` : "Sur estimation"}
                    </span>
                  </li>
                ))}
              </ul>

              {selectedComboCount === 1 &&
                missingComboService &&
                !isComboUpsellDismissed && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <div className="min-w-0 flex items-start gap-2">
                        <p className="min-w-0 text-sm leading-snug text-foreground/85">
                          Ajoutez{" "}
                          <span className="font-medium text-foreground">
                            {missingComboService.label}
                          </span>{" "}
                          et économisez{" "}
                          <span className="font-medium text-primary">
                            {COMBO_DISCOUNT} $
                          </span>
                          .
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-3 sm:border-t-0 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => onToggleService(missingComboService.id)}
                          className="flex-1 border h-9 items-center rounded-full px-3 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                        >
                          Ajouter
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsComboUpsellDismissed(true)}
                          className="flex-1 h-9 border items-center rounded-full px-3 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                        >
                          Ignorer
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

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
                    -{COMBO_DISCOUNT} $
                  </span>
                </motion.div>
              )}

              {quote.numericItems.length > 0 && (
                <div className="flex items-baseline justify-between pt-3">
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

              {quote.needsEstimate && (
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Estimation personnalisée requise pour les services commerciaux ou
                  personnalisés. Nous vous contacterons rapidement.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
