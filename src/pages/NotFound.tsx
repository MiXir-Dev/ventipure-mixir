import { Link, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "@/consts/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();


  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 bg-background">
        <div className="vp-container max-w-3xl">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Accueil", to: ROUTE_PATHS.HOME },
              { label: "Page introuvable" },
            ]}
          />

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
            Erreur 404
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.1]">
            Page introuvable
          </h1>

          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-2xl mb-8">
            La page que vous cherchez n’existe pas, a été déplacée ou le lien
            n’est plus valide. Vous pouvez retourner à l’accueil pour consulter
            nos services de nettoyage de conduits, nos tarifs ou notre formulaire
            de soumission.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to={ROUTE_PATHS.HOME}>
              <Button variant="default" size="lg">
                Retour à l’accueil
              </Button>
            </Link>

            <Link to={ROUTE_PATHS.CONTACT}>
              <Button variant="outline" size="lg">
                Demander une soumission
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;