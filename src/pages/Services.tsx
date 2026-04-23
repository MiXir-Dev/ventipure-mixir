import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ROUTE_PATHS, buildContactServicePath } from "@/consts/navigation";
import {
  SERVICE_MARKETING_ENTRIES,
  SERVICE_ROUTE_BY_ID,
  type ServiceMarketingId,
} from "@/consts/services";
import { SeoLinksParagraph } from "@/components/SeoLinksParagraph";
import { PageBottomCta } from "@/components/PageBottomCta";
import { Breadcrumb } from "@/components/Breadcrumb";

const Services = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedServiceFilters, setSelectedServiceFilters] = useState<ServiceMarketingId[]>([]);

  const toggleServiceFilter = (id: ServiceMarketingId) => {
    setSelectedServiceFilters((prev) =>
      prev.includes(id) ? prev.filter((filterId) => filterId !== id) : [...prev, id],
    );
  };

  const filteredServices = useMemo(
    () =>
      selectedServiceFilters.length === 0
        ? SERVICE_MARKETING_ENTRIES
        : SERVICE_MARKETING_ENTRIES.filter((service) => selectedServiceFilters.includes(service.id)),
    [selectedServiceFilters],
  );

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
                  { label: "Services" },
                ]}
              />
              <div className="animate-fade-in">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-5 leading-[1.1]">
                  Services de nettoyage de ventilation résidentielle
                </h1>
                <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
                  Des interventions professionnelles pour aider à maintenir un air
                  intérieur plus sain et des systèmes mieux entretenus.
                </p>
                <SeoLinksParagraph
                  className="mb-8"
                >
                  Consultez aussi nos <Link to={ROUTE_PATHS.TARIFS}>prix du nettoyage de ventilation</Link>, notre{" "}
                  <Link to={ROUTE_PATHS.EQUIPEMENT}>équipement professionnel de nettoyage de conduits</Link> et nos{" "}
                  <Link to={ROUTE_PATHS.SECTEURS}>secteurs desservis à Montréal, Laval et Longueuil</Link>.
                </SeoLinksParagraph>
                <div className="flex flex-wrap gap-3">
                  <Link to={ROUTE_PATHS.CONTACT}>
                    <Button variant="default" size="lg">
                      Demander une soumission gratuite
                    </Button>
                  </Link>
                  <Link to={ROUTE_PATHS.TARIFS}>
                    <Button variant="outline" size="lg">
                      Voir les tarifs de nettoyage
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Quick nav pills */}
          <section className="pb-4 md:pb-14">
            <div className="vp-container">
              <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-[0.15em] mb-5">
                  Services les plus demandés
                </p>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_MARKETING_ENTRIES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={selectedServiceFilters.includes(s.id)}
                      onClick={() => toggleServiceFilter(s.id)}
                      className={`px-4 py-2.5 rounded-full border text-sm font-medium ${
                        selectedServiceFilters.includes(s.id)
                          ? "border-primary text-primary bg-primary/5"
                          : "border-border text-foreground/80 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {s.servicesPage.title
                        .replace("Nettoyage des ", "")
                        .replace("Nettoyage de l'", "")
                        .replace("Nettoyage du ", "")
                        .replace("Nettoyage d'", "")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Service sections */}
          {filteredServices.map((s, i) => {
            const isEven = i % 2 === 0;
            return (
              <section
                key={s.id}
                id={s.id}
                className="pb-20 md:pb-32 scroll-mt-28"
              >
                <div className="vp-container">
                  <div
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
                    <div className={`${isEven ? "" : "md:[direction:ltr]"} flex flex-col`}>
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
                      <Link
                        to={SERVICE_ROUTE_BY_ID[s.id]}
                        className="mt-3 inline-flex text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        En savoir plus sur {s.servicesPage.title.toLowerCase()}
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

          <PageBottomCta
            title="Besoin d'un service de nettoyage résidentiel?"
            description="Parlez-nous de votre besoin et obtenez une soumission adaptée."
            buttonTo={ROUTE_PATHS.CONTACT}
            buttonLabel="Demander une soumission gratuite"
          />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Services;
