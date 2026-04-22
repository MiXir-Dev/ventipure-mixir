import { useState } from "react";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { PageBottomCta } from "@/components/PageBottomCta";
import { SeoLinksParagraph } from "@/components/SeoLinksParagraph";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTE_PATHS } from "@/consts/navigation";

const equipNexair = "/nettoyage-ventillations/equip-nexair.jpg";
const equipOmega = "/nettoyage-ventillations/equip-omega.jpg";
const equipEditorial = "/nettoyage-ventillations/equip-editorial.jpg";

const Equipement = () => {
  const [panelOpen, setPanelOpen] = useState(false);

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
                  Équipement
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-5 leading-[1.1]">
                  Équipement et méthode de travail
                </h1>
                <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xl mb-8">
                  VentiPure travaille avec un matériel professionnel sélectionné pour la puissance, la propreté et la fiabilité, autant en résidentiel qu'en commercial.
                </p>
                <SeoLinksParagraph
                  className="max-w-xl mb-8"
                >
                  Découvrez aussi nos <Link to={ROUTE_PATHS.SERVICES}>services de nettoyage de conduits de ventilation</Link>, nos{" "}
                  <Link to={ROUTE_PATHS.TARIFS}>prix pour le nettoyage d'échangeur d'air et de sécheuse</Link> et nos{" "}
                  <Link to={ROUTE_PATHS.SECTEURS}>zones desservies dans le Grand Montréal</Link>.
                </SeoLinksParagraph>
                <div className="flex flex-wrap gap-3">
                  <Link to={ROUTE_PATHS.CONTACT}>
                    <Button variant="default" size="lg">Nous contacter</Button>
                  </Link>
                  <Link to={ROUTE_PATHS.SERVICES}>
                    <Button variant="outline" size="lg">Voir les services</Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Intro */}
          <section className="pb-20 md:pb-28">
            <div className="vp-container max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="text-foreground/90 text-base md:text-lg leading-relaxed"
              >
                La qualité d'une intervention dépend des outils utilisés et de la méthode appliquée. Nous combinons une unité d'aspiration haute performance et un compresseur d'air industriel pour traiter chaque conduit en profondeur, sans compromis sur la propreté du domicile.
              </motion.p>
            </div>
          </section>

          {/* Equipment 1: NexAir */}
          <section className="pb-20 md:pb-28">
            <div className="vp-container">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8 md:gap-14 items-center"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={equipNexair}
                    alt="Capteur de poussière pulsé NexAir avec filtration HEPA"
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.18em] mb-3">
                    Aspiration · Filtration HEPA
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
                    Capteur de poussière pulsé
                  </h2>
                  <p className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wider mb-5">
                    NexAir / LTE Canada
                  </p>
                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-5">
                    Un collecteur de poussière québécois haute performance qui crée une pression négative puissante dans l'ensemble du réseau de conduits. Toutes les particules délogées sont aspirées et capturées à travers une filtration HEPA, sans recirculer dans la maison.
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Pression négative puissante sur tout le réseau",
                      "Filtration HEPA pour une capture fine des particules",
                      "Système à pulsation pour décrocher les résidus collés",
                    ].map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Equipment 2: Omega */}
          <section className="pb-20 md:pb-28">
            <div className="vp-container">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8 md:gap-14 items-center md:[direction:rtl]"
              >
                <div className="md:[direction:ltr] aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={equipOmega}
                    alt="Compresseur d'air à essence Omega Gustmaster motorisé Honda"
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:[direction:ltr]">
                  <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.18em] mb-3">
                    Soufflage · Outils pneumatiques
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
                    Compresseur d'air à essence
                  </h2>
                  <p className="text-xs font-medium text-muted-foreground/80 uppercase tracking-wider mb-5">
                    Omega Gustmaster · motorisé Honda
                  </p>
                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-5">
                    Motorisé par un moteur Honda reconnu pour sa fiabilité, ce compresseur alimente nos buses de soufflage et nos furets pneumatiques. Il déloge la saleté la plus incrustée dans le réseau, qui est ensuite aspirée par l'unité de captation.
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      "Moteur Honda à essence, autonome sur le terrain",
                      "Alimente furets pneumatiques et buses haute pression",
                      "Idéal pour les conduits longs et les réseaux commerciaux",
                    ].map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Why it matters */}
          <section className="py-10 md:py-28">
            <div className="vp-container max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
                  Ce que ça change pour vous
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-8">
                  Un travail rigoureux, du début à la fin
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Intervention plus rigoureuse",
                      text: "L'équipement professionnel permet un nettoyage plus complet que les méthodes conventionnelles.",
                    },
                    {
                      title: "Travail plus propre dans la maison",
                      text: "La pression négative et la filtration HEPA empêchent la poussière de se redéposer chez vous.",
                    },
                    {
                      title: "Adapté au résidentiel et au commercial",
                      text: "Les mêmes équipements desservent maisons, bureaux et bâtiments à plus grande échelle.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="text-[15px] font-semibold text-foreground mb-1">{item.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <PageBottomCta
            title="Besoin d'un service de ventilation?"
            description="Parlez-nous de votre besoin et obtenez une soumission adaptée à votre résidence ou à votre commerce."
            buttonTo={ROUTE_PATHS.CONTACT}
            buttonLabel="Nous contacter"
          />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Equipement;
