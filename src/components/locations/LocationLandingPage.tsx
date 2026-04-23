import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/FAQSection";
import { ROUTE_PATHS } from "@/consts/navigation";
import { type LocationLandingPageConfig } from "@/consts/locationLandingPages";
import { PageBottomCta } from "@/components/PageBottomCta";
import { SeoLinksParagraph } from "@/components/SeoLinksParagraph";

const sectionTransition = { duration: 0.45 };
const swipeThreshold = 60;

type LocationLandingPageProps = {
  config: LocationLandingPageConfig;
};

export function LocationLandingPage({ config }: LocationLandingPageProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);

  const activeHighlight = config.highlightItems[activeHighlightIndex];

  const goToHighlight = (index: number) => {
    setActiveHighlightIndex(index);
  };

  const goNext = () => {
    setActiveHighlightIndex((prev) => (prev + 1) % config.highlightItems.length);
  };

  const goPrev = () => {
    setActiveHighlightIndex((prev) =>
      prev === 0 ? config.highlightItems.length - 1 : prev - 1,
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main>
          {/* Hero */}
          <section className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28">
            <div className="vp-container max-w-6xl">
              <Breadcrumb
                className="mb-6"
                items={[
                  { label: "Accueil", to: ROUTE_PATHS.HOME },
                  { label: `Nettoyage de ventilation à ${config.cityName}` },
                ]}
              />

              <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={sectionTransition}
                  className="min-w-0"
                >
                  <h1 className="mb-5 max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                    Nettoyage de ventilation à {config.cityName}
                  </h1>

                  <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                    {config.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link to={ROUTE_PATHS.CONTACT} className="w-full max-w-full sm:w-auto">
                      <Button
                        size="lg"
                        className="h-auto w-full max-w-[22rem] whitespace-normal px-5 py-4 text-left leading-snug sm:w-auto"
                      >
                        {config.primaryCtaLabel}
                      </Button>
                    </Link>

                    <Link to={ROUTE_PATHS.TARIFS} className="w-full max-w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-auto w-full whitespace-normal px-5 py-4 text-left leading-snug sm:w-auto"
                      >
                        Voir les tarifs
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...sectionTransition, delay: 0.05 }}
                  className="min-w-0"
                >
                  <div className="relative overflow-hidden rounded-[2rem] bg-muted/20">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeHighlightIndex}
                        initial={{ opacity: 0.4, scale: 1.01 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.4, scale: 0.99 }}
                        transition={{ duration: 0.28 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.12}
                        onDragEnd={(_, info) => {
                          if (info.offset.x <= -swipeThreshold) {
                            goNext();
                          } else if (info.offset.x >= swipeThreshold) {
                            goPrev();
                          }
                        }}
                        className="relative"
                      >
                        <img
                          src={activeHighlight.image.src}
                          alt={activeHighlight.image.alt}
                          className="block aspect-[4/3] w-full object-cover"
                          loading="eager"
                          width={1400}
                          height={1050}
                        />

                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={`caption-${activeHighlightIndex}`}
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.28 }}
                              className="rounded-2xl px-4 py-4 backdrop-blur-sm shadow-[var(--vp-shadow-card)] md:px-5"
                            >
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                                Point fort
                              </p>
                              <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
                                {activeHighlight.title}
                              </p>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <div className="flex items-center gap-2">
                      {config.highlightItems.map((item, index) => {
                        const isActive = index === activeHighlightIndex;

                        return (
                          <button
                            key={`${item.title}-dot-${index}`}
                            type="button"
                            onClick={() => goToHighlight(index)}
                            aria-label={`Aller à la diapositive ${index + 1}`}
                            aria-pressed={isActive}
                            className={`rounded-full transition-all ${
                              isActive
                                ? "h-2.5 w-6 bg-primary"
                                : "h-2.5 w-2.5 bg-foreground/20 hover:bg-foreground/35"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Local context + approach */}
          <section className="pb-16 md:pb-24">
            <div className="vp-container max-w-6xl">
              <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={sectionTransition}
                  className="rounded-3xl border border-border p-6 md:p-8"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Contexte local
                  </p>
                  <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    Une réalité propre à {config.cityName}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {config.localContext}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...sectionTransition, delay: 0.05 }}
                  className="rounded-3xl border border-border p-6 md:p-8"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Notre approche
                  </p>
                  <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    Une intervention adaptée au bâtiment
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {config.serviceApproach}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Neighborhoods */}
          <section className="pb-16 md:pb-24">
            <div className="vp-container max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={sectionTransition}
                className="border-y border-border py-8 md:py-10"
              >
                <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      Secteurs couverts
                    </p>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      Quartiers desservis à {config.cityName}
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 lg:self-center">
                    {config.neighborhoods.map((area) => (
                      <span
                        key={area}
                        className="inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground/85"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* FAQ */}
          <FaqSection
            className="pb-16 md:pb-24"
            items={config.faq}
            eyebrow="Questions fréquentes"
            title={`Réponses utiles pour ${config.cityName}`}
          />

          {/* Internal links */}
          <SeoLinksParagraph
            className="p-4 mb-4"
          >
            Vous pouvez aussi consulter nos{" "}
            <Link to={ROUTE_PATHS.SERVICES}>services de nettoyage de conduits de ventilation</Link> et nos{" "}
            <Link to={ROUTE_PATHS.TARIFS}>prix de nettoyage d'échangeur d'air, sécheuse et fournaise</Link> avant de
            soumettre votre demande. consulter toutes les{" "}
            <Link
              to={ROUTE_PATHS.SECTEURS}
              className="text-primary transition-colors hover:text-primary/80"
            >
              zones desservies
            </Link>
          </SeoLinksParagraph>

         <PageBottomCta
          className="pb-20 md:pb-28"
          title={`Besoin d’un service à ${config.cityName}?`}
          description="Parlez-nous de votre bâtiment et recevez une soumission adaptée à votre secteur."
          buttonTo={ROUTE_PATHS.CONTACT}
          buttonLabel={config.primaryCtaLabel}
        />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}