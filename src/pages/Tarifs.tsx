import { useState } from "react";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ROUTE_PATHS, buildContactServicePath } from "@/consts/navigation";
import { SERVICE_MARKETING_ENTRIES } from "@/consts/services";

const Tarifs = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="vp-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-14 md:mb-20 max-w-2xl"
            >
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">Tarification</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                Tarifs résidentiels et commerciaux
              </h1>
              <p className="text-muted-foreground text-[15px]">
                Prix affichés, sans surprise. Service professionnel de nettoyage de ventilation pour résidences, bureaux et commerces au Québec.
              </p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Pour comparer les interventions en détail, visitez la page{" "}
                <Link to={ROUTE_PATHS.SERVICES} className="text-primary hover:text-primary/80 transition-colors">
                  nettoyage de conduits de ventilation résidentiels et commerciaux
                </Link>{" "}
                puis confirmez votre zone sur{" "}
                <Link
                  to={ROUTE_PATHS.SECTEURS}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  nos secteurs desservis à Montréal, Laval, Longueuil et la Rive-Sud
                </Link>
                .
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5 md:gap-6 mb-20">
              {SERVICE_MARKETING_ENTRIES.map((s, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="h-full"
                >
                  <Link
                    to={buildContactServicePath(s.id)}
                    className="group block h-full rounded-2xl border border-border bg-card overflow-hidden hover:shadow-[var(--vp-shadow-card)] transition-shadow duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={s.tarifsPage.image}
                        alt={s.tarifsPage.alt}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 md:p-7 flex h-full flex-col">
                      <h2 className="text-lg font-bold text-foreground tracking-tight mb-3">
                        {s.tarifsPage.title}
                      </h2>
                      <div className="flex items-baseline gap-2 mb-4">
                        {s.tarifsPage.priceNote && (
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {s.tarifsPage.priceNote}
                          </span>
                        )}
                        <span className="text-2xl md:text-3xl font-extrabold text-primary tabular-nums">
                          {s.tarifsPage.price}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {s.tarifsPage.includes}
                      </p>
                      <div className="mt-auto pt-5">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                          Demander ce service
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-sm text-muted-foreground mb-6">
                Soumission gratuite pour tous nos services de nettoyage résidentiel et commercial.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Consultez aussi notre{" "}
                <Link to={ROUTE_PATHS.EQUIPEMENT} className="text-primary hover:text-primary/80 transition-colors">
                  méthode et équipement de nettoyage de conduits
                </Link>{" "}
                pour comprendre comment nous réalisons chaque intervention.
              </p>
              <Link to={ROUTE_PATHS.CONTACT}>
                <Button variant="default" size="lg">
                  Demander une soumission
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Tarifs;
