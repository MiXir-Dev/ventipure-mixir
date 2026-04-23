import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { ROUTE_PATHS, buildContactServicePath } from "@/consts/navigation";
import { FaqSection } from "@/components/FAQSection";
import {
  getServiceEntryForLanding,
  getServiceRoute,
  type ServiceLandingPageConfig,
} from "@/consts/serviceLandingPages";

const sectionTransition = { duration: 0.45 };

type ServiceLandingPageProps = {
  config: ServiceLandingPageConfig;
};

export function ServiceLandingPage({ config }: ServiceLandingPageProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const service = getServiceEntryForLanding(config.id);
  const relatedServices = config.relatedServices.map((id) =>
    getServiceEntryForLanding(id),
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main>
          {/* Hero */}
          <section className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28 bg-background">
            <div className="vp-container max-w-6xl">
              <Breadcrumb
                className="mb-6"
                items={[
                  { label: "Accueil", to: ROUTE_PATHS.HOME },
                  { label: "Services", to: ROUTE_PATHS.SERVICES },
                  { label: service.servicesPage.title },
                ]}
              />

              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={sectionTransition}
                  className="flex h-full min-w-0 flex-col"
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-[1.08] mb-5">
                    {config.h1}
                  </h1>

                  <p className="max-w-2xl text-[15px] md:text-base leading-relaxed text-muted-foreground mb-6">
                    {config.subtitle}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-3">
                    <Link to={buildContactServicePath(config.id)} className="w-full sm:w-auto max-w-full">
                      <Button
                        size="lg"
                        className="h-auto w-full sm:w-auto max-w-full whitespace-normal text-left leading-snug px-5 py-4"
                      >
                        {config.primaryCtaLabel}
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
                  <div className="relative w-full overflow-hidden rounded-3xl bg-muted/25">
                    <img
                      src={config.heroImage.src}
                      alt={config.heroImage.alt}
                      className="block w-full aspect-[4/3] object-cover"
                      loading="eager"
                      width={1400}
                      height={1050}
                    />

                    <div className="absolute top-4 left-4 md:top-6 md:left-6">
                      <div className="rounded-2xl bg-background/95 px-4 py-3 md:px-5 md:py-4 shadow-[var(--vp-shadow-card)]">
                        <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.16em] text-primary mb-1">
                          À partir de
                        </p>
                        <p className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground leading-none">
                          {config.priceSignal}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Main content */}
          <section className="pb-16 md:pb-20">
            <div className="vp-container max-w-6xl">
              <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={sectionTransition}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                    Pourquoi ce service
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                    Un entretien utile pour garder votre système bien entretenu
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted-foreground mb-6 text-left">
                    {config.problemSection}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {config.symptomChips.map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex rounded-full bg-muted/35 px-3.5 py-2 text-sm text-foreground/80"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...sectionTransition, delay: 0.05 }}
                  className="space-y-6"
                >
                  {config.supportImage && (
                    <div className="overflow-hidden rounded-3xl bg-muted/25">
                      <img
                        src={config.supportImage.src}
                        alt={config.supportImage.alt}
                        className="w-full aspect-[4/3] object-cover"
                        loading="lazy"
                        width={1200}
                        height={900}
                      />
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>

          <section className="pb-16 md:pb-20">
            <div className="vp-container max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={sectionTransition}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                  Portée du service
                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-10">
                  Ce qui est inclus et non inclus
                </h2>

                <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-5">
                      Inclus
                    </h3>

                    <ul className="space-y-4">
                      {config.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm md:text-[15px] leading-relaxed text-foreground/85"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:border-l lg:border-border lg:pl-14">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-5">
                      Non inclus
                    </h3>

                    <ul className="space-y-4">
                      {config.excludes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm md:text-[15px] leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/45 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Process */}
          <section className="pb-16 md:pb-20">
            <div className="vp-container max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={sectionTransition}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                  Déroulement
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-8">
                  Comment se déroule l’intervention
                </h2>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {config.processSteps.map((step, index) => (
                    <div key={step.title} className="space-y-3">
                      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {index + 1}
                      </span>
                      <h3 className="text-base font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* FAQ */}
          <FaqSection
            className="pb-16 md:pb-20"
            items={config.faq}
            eyebrow="Questions fréquentes"
            title="Réponses utiles avant de demander une soumission"
          />
          

          {/* Subtle related services */}
          <section className="pb-14 md:pb-16">
            <div className="vp-container max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={sectionTransition}
                className="border-t border-border pt-6"
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Services liés :{" "}
                  {relatedServices.map((related, index) => (
                    <span key={related.id}>
                      <Link
                        to={getServiceRoute(related.id)}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        {related.servicesPage.title}
                      </Link>
                      {index < relatedServices.length - 1 ? " · " : ""}
                    </span>
                  ))}
                  {" "}·{" "}
                  <Link
                    to={ROUTE_PATHS.TARIFS}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Voir les tarifs
                  </Link>
                </p>
              </motion.div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="pb-20 md:pb-28">
            <div className="vp-container max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={sectionTransition}
                className="text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
                  Soumission
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                  Prêt à planifier votre nettoyage?
                </h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Parlez-nous de votre besoin et recevez une soumission adaptée à
                  votre installation.
                </p>

                <Link to={buildContactServicePath(config.id)} className="w-full sm:w-auto inline-block">
                  <Button
                    size="lg"
                    className="h-auto w-full sm:w-auto whitespace-normal text-left leading-snug px-5 py-4"
                  >
                    {config.primaryCtaLabel}
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
}