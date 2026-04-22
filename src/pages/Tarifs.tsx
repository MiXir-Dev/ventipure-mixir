import { useState } from "react";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { PageBottomCta } from "@/components/PageBottomCta";
import { SeoLinksParagraph } from "@/components/SeoLinksParagraph";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ROUTE_PATHS, buildContactServicePath } from "@/consts/navigation";
import { SERVICE_MARKETING_ENTRIES, SERVICE_ROUTE_BY_ID } from "@/consts/services";
import { Breadcrumb } from "@/components/Breadcrumb";

const Tarifs = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="vp-container">
            <Breadcrumb
              className="mb-6"
              items={[
                { label: "Accueil", to: ROUTE_PATHS.HOME },
                { label: "Tarifs" },
              ]}
            />
            <div className="animate-fade-in mb-14 md:mb-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                Tarifs résidentiels et commerciaux
              </h1>
              <p className="text-muted-foreground text-[15px]">
                Prix affichés, sans surprise. Service professionnel de nettoyage de ventilation pour résidences, bureaux et commerces au Québec.
              </p>
              <SeoLinksParagraph
                className="mt-4"
              >
                Pour comparer les interventions en détail, visitez la page{" "}
                <Link to={ROUTE_PATHS.SERVICES}>nettoyage de conduits de ventilation résidentiels et commerciaux</Link>{" "}
                puis confirmez votre zone sur{" "}
                <Link to={ROUTE_PATHS.SECTEURS}>nos secteurs desservis à Montréal, Laval, Longueuil et la Rive-Sud</Link>.
              </SeoLinksParagraph>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 md:gap-6 mb-20">
              {SERVICE_MARKETING_ENTRIES.map((s, i) => (
                <article
                  key={i}
                  className="animate-fade-in h-full"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="group h-full rounded-2xl border border-border bg-card overflow-hidden hover:shadow-[var(--vp-shadow-card)] transition-shadow duration-300">
                    <Link to={SERVICE_ROUTE_BY_ID[s.id]} className="block">
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
                    </Link>
                    <div className="p-6 md:p-7 flex flex-col">
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
                      <div className="mt-auto pt-5 flex flex-col gap-2">
                        <Link
                          to={SERVICE_ROUTE_BY_ID[s.id]}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          Voir le service détaillé
                        </Link>
                        <Link
                          to={buildContactServicePath(s.id)}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          Demander ce service
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <PageBottomCta
              className="pb-0 md:pb-0"
              description="Soumission gratuite pour tous nos services de nettoyage résidentiel et commercial."
              buttonTo={ROUTE_PATHS.CONTACT}
              buttonLabel="Demander une soumission gratuite"
            >
              <SeoLinksParagraph>
                Consultez aussi notre{" "}
                <Link to={ROUTE_PATHS.EQUIPEMENT}>méthode et équipement de nettoyage de conduits</Link> pour comprendre
                comment nous réalisons chaque intervention.
              </SeoLinksParagraph>
            </PageBottomCta>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Tarifs;
