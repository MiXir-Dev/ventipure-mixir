import { useState, useCallback } from "react";
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

const Services = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main>
          {/* Hero */}
          <section className="pt-32 pb-16 md:pt-44 md:pb-24">
            <div className="vp-container max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                  Services
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-5 leading-[1.1]">
                  Services de nettoyage de ventilation résidentielle
                </h1>
                <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xl mb-8">
                  Des interventions professionnelles pour aider à maintenir un air
                  intérieur plus sain et des systèmes mieux entretenus.
                </p>
                <p className="text-sm text-muted-foreground max-w-xl mb-8 leading-relaxed">
                  Consultez aussi nos{" "}
                  <Link to={ROUTE_PATHS.TARIFS} className="text-primary hover:text-primary/80 transition-colors">
                    prix du nettoyage de ventilation
                  </Link>
                  , notre{" "}
                  <Link to={ROUTE_PATHS.EQUIPEMENT} className="text-primary hover:text-primary/80 transition-colors">
                    équipement professionnel de nettoyage de conduits
                  </Link>{" "}
                  et nos{" "}
                  <Link
                    to={ROUTE_PATHS.SECTEURS}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    secteurs desservis à Montréal, Laval et Longueuil
                  </Link>
                  .
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to={ROUTE_PATHS.CONTACT}>
                    <Button variant="default" size="lg">
                      Demander une soumission
                    </Button>
                  </Link>
                  <Link to={ROUTE_PATHS.TARIFS}>
                    <Button variant="outline" size="lg">
                      Voir les tarifs
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Quick nav pills */}
          <section className="pb-16 md:pb-24">
            <div className="vp-container">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.15em] mb-5">
                  Services les plus demandés
                </p>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_MARKETING_ENTRIES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className="px-4 py-2.5 rounded-full border border-border text-sm font-medium text-foreground/80 hover:border-primary hover:text-primary transition-colors duration-200"
                    >
                      {s.servicesPage.title
                        .replace("Nettoyage des ", "")
                        .replace("Nettoyage de l'", "")
                        .replace("Nettoyage du ", "")
                        .replace("Nettoyage d'", "")}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Service sections */}
          {SERVICE_MARKETING_ENTRIES.map((s, i) => {
            const isEven = i % 2 === 0;
            return (
              <section
                key={s.id}
                id={s.id}
                className="pb-20 md:pb-32 scroll-mt-28"
              >
                <div className="vp-container">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center ${
                      isEven ? "" : "md:[direction:rtl]"
                    }`}
                  >
                    {/* Image */}
                    <div className={`${isEven ? "" : "md:[direction:ltr]"}`}>
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                        <img
                          src={s.servicesPage.image}
                          alt={s.servicesPage.alt}
                          loading="lazy"
                          width={1280}
                          height={960}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${isEven ? "" : "md:[direction:ltr]"}`}>
                      <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">
                        {s.servicesPage.price}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4 leading-tight">
                        {s.servicesPage.title}
                      </h2>
                      <p className="text-muted-foreground text-[15px] leading-relaxed mb-6">
                        {s.servicesPage.description}
                      </p>
                      <ul className="space-y-2.5 mb-8">
                        {s.servicesPage.benefits.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-sm text-foreground/80"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Link to={buildContactServicePath(s.id)}>
                        <Button variant="outline" size="default">
                          Demander ce service
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </section>
            );
          })}

          {/* Final CTA */}
          <section className="pb-20 md:pb-32">
            <div className="vp-container max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                  Besoin d'un service de nettoyage résidentiel?
                </h2>
                <p className="text-muted-foreground text-[15px] mb-8">
                  Parlez-nous de votre besoin et obtenez une soumission adaptée.
                </p>
                <Link to={ROUTE_PATHS.CONTACT}>
                  <Button variant="default" size="lg">
                    Nous contacter
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Services;
