import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { COMBO_DISCOUNT, getService } from "@/consts/services";
import { buildContactComboPath } from "@/consts/navigation";

/**
 * Best-seller combo section.
 * Officially: Furnace ducts (349$) + Dryer vent (149$) - $20 off = 478$.
 */
export function BestSellerCombo() {
  const furnace = getService("conduits")!;
  const dryer = getService("secheuse")!;
  const subtotal = (furnace.price ?? 0) + (dryer.price ?? 0); // 498
  const total = subtotal - COMBO_DISCOUNT; // 478

  return (
    <section className="vp-section-padding bg-background">
      <div className="vp-container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card"
        >
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            aria-hidden
          />

          <div className="relative grid md:grid-cols-[1.1fr_1fr] gap-0">
            {/* Left: content */}
            <div className="p-8 sm:p-10 md:p-14 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 self-start mb-5 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                  Meilleur vendeur
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold text-foreground tracking-tight leading-[1.05] mb-4">
                Le combo favori<br />de nos clients
              </h2>

              <p className="text-muted-foreground text-[15px] leading-relaxed mb-8 max-w-md">
                Conduits de fournaise et conduit de sécheuse nettoyés
                en une seule visite. L'entretien essentiel pour un
                système plus performant et plus sécuritaire.
              </p>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-foreground tabular-nums">
                  {total}&nbsp;$
                </span>
                <span className="text-lg text-muted-foreground line-through tabular-nums">
                  {subtotal}&nbsp;$
                </span>
              </div>
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-8">
                Rabais de {COMBO_DISCOUNT} $ inclus
              </p>

              <Link to={buildContactComboPath("best-seller")} className="self-start">
                <Button variant="default" size="lg" className="group">
                  Réserver ce combo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>

            {/* Right: visual breakdown */}
            <div className="relative bg-muted/40 border-t md:border-t-0 md:border-l border-border p-8 sm:p-10 md:p-12 flex flex-col justify-center gap-5">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.18em] mb-1">
                Ce qui est inclus
              </p>

              <div className="flex items-baseline justify-between pb-5 border-b border-border/60">
                <div>
                  <p className="text-[15px] font-semibold text-foreground">
                    Conduits de fournaise
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Jusqu'à 15 sorties incluses
                  </p>
                </div>
                <span className="text-sm font-bold text-foreground tabular-nums">
                  {furnace.price}&nbsp;$
                </span>
              </div>

              <div className="flex items-baseline justify-between pb-5 border-b border-border/60">
                <div>
                  <p className="text-[15px] font-semibold text-foreground">
                    Conduit de sécheuse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Retrait de la charpie et résidus
                  </p>
                </div>
                <span className="text-sm font-bold text-foreground tabular-nums">
                  {dryer.price}&nbsp;$
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Combo
                </span>
                <span className="text-2xl font-extrabold text-primary tabular-nums">
                  {total}&nbsp;$
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
