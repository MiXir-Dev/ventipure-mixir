import { useState } from "react";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { PageBottomCta } from "@/components/PageBottomCta";
import { SeoLinksParagraph } from "@/components/SeoLinksParagraph";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, MapPinned } from "lucide-react";
import { ROUTE_PATHS } from "@/consts/navigation";
import { SERVICE_ZONES, ZONE_ROUTE_BY_AREA_LABEL, ZONE_ROUTE_BY_REGION_LABEL } from "@/consts/zones";
import { SERVICE_AREAS_MAP_EMBED_URL } from "@/consts/contact";
import { Breadcrumb } from "@/components/Breadcrumb";

const NosServicesEtSecteurs = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main>
          {/* Hero */}
          <section className="pt-32 pb-20 md:pt-40 md:pb-28">
            <div className="vp-container max-w-3xl">
              <Breadcrumb
                className="mb-6"
                items={[
                  { label: "Accueil", to: ROUTE_PATHS.HOME },
                  { label: "Zones desservies" },
                ]}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-5 leading-[1.1]">
                  Nettoyage de ventilation à Montréal et la Rive-Sud
                </h1>
                <p className="text-muted-foreground text-[15px] leading-relaxed">
                  VentiPure intervient dans les principales régions du Grand Montréal et de la Rive-Nord.
                  Nous desservons résidences, bureaux et commerces dans les villes et quartiers ci-dessous.
                </p>
                <SeoLinksParagraph className="mt-5">
                  Avant de réserver, consultez nos{" "}
                  <Link to={ROUTE_PATHS.SERVICES}>services de nettoyage de ventilation</Link> et les{" "}
                  <Link to={ROUTE_PATHS.TARIFS}>
                    tarifs de nettoyage de conduits résidentiels et commerciaux
                  </Link>
                  .
                </SeoLinksParagraph>
              </motion.div>
            </div>
          </section>

          {/* Map visual */}
          <section className="pb-16 md:pb-24">
            <div className="vp-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden bg-muted/40 border border-border"
              >
                <div className="aspect-[16/8] md:aspect-[16/6]">
                  <iframe
                    src={SERVICE_AREAS_MAP_EMBED_URL}
                    title="Carte des secteurs desservis par VentiPure dans le Grand Montréal"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Zones grid */}
          <section className="pb-20 md:pb-28">
            <div className="vp-container">
              <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                {SERVICE_ZONES.map((z, i) => {
                  const regionPath = ZONE_ROUTE_BY_REGION_LABEL[z.region];

                  return (
                    <motion.div
                      key={z.region}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                    >
                      <div className="group h-full rounded-2xl border border-border bg-card p-7 md:p-8 transition-all duration-200 hover:border-primary/30 hover:bg-muted/20 hover:-translate-y-0.5">
                        <div className="flex items-start justify-between gap-4 mb-5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <MapPin
                              className="h-4 w-4 text-primary shrink-0"
                              strokeWidth={2.2}
                            />
                            <h2 className="text-lg font-bold tracking-tight">
                              <Link
                                to={regionPath}
                                className="text-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                              >
                                {z.region}
                              </Link>
                            </h2>
                          </div>

                          <MapPinned className="h-4 w-4 text-muted-foreground transition-colors duration-200 group-hover:text-primary shrink-0" />
                        </div>

                        <ul className="flex flex-wrap gap-2">
                          {z.areas.map((a) => (
                            <li
                              key={a}
                              className="rounded-full bg-muted/60 transition-colors duration-200 group-hover:bg-muted"
                            >
                              <Link
                                to={ZONE_ROUTE_BY_AREA_LABEL[a]}
                                className="block px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:text-primary"
                              >
                                {a}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <PageBottomCta
            title="Votre ville n'est pas listée?"
            description="Contactez-nous, nous évaluons chaque demande au cas par cas dans le Grand Montréal."
            buttonTo={ROUTE_PATHS.CONTACT}
            buttonLabel="Demander une soumission gratuite"
          >
            <SeoLinksParagraph>
              Faites votre{" "}
              <Link to={ROUTE_PATHS.CONTACT}>
                demande de soumission pour le nettoyage de conduits à Montréal, Laval, Longueuil,
                Rive-Sud ou Repentigny
              </Link>
              .
            </SeoLinksParagraph>
          </PageBottomCta>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default NosServicesEtSecteurs;
