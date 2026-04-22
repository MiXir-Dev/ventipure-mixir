import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/consts/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CONTACT_EMAIL, CONTACT_EMAIL_URL } from "@/consts/contact";

const ModalitesDutilisation = () => {
  return (
    <main className="min-h-screen bg-background pt-20 pb-20">
      <div className="vp-container max-w-3xl">
        <Breadcrumb
          className="mb-6"
          items={[
            { label: "Accueil", to: ROUTE_PATHS.HOME },
            { label: "Modalités d'utilisation" },
          ]}
        />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          Modalités d’utilisation
        </p>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
          Modalités d’utilisation
        </h1>

        <p className="text-muted-foreground text-[15px] leading-relaxed mb-10">
          Les présentes modalités d’utilisation encadrent l’accès et l’utilisation
          du site Web de VentiPure. En naviguant sur ce site, vous acceptez les
          conditions générales décrites ci-dessous.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              1. Utilisation du site
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Le site de VentiPure a pour but de présenter nos services, nos
              tarifs indicatifs, nos secteurs desservis et de permettre aux
              visiteurs de nous contacter pour une demande de soumission ou
              d’information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              2. Informations présentées
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Nous faisons des efforts raisonnables pour offrir des informations
              exactes et à jour. Toutefois, le contenu du site est fourni à titre
              informatif seulement et peut être modifié sans préavis. Les prix 
              de services et disponibilités peuvent varier selon la situation réelle, 
              la distance, le type d’installation ou les besoins particuliers du client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              3. Demandes de soumission
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Toute demande envoyée par le formulaire du site ne constitue pas une
              confirmation automatique de rendez-vous ni une offre finale ferme.
              Une validation peut être nécessaire avant de confirmer le service,
              le prix final ou la disponibilité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              4. Propriété du contenu
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Le contenu du site, incluant notamment les textes, images,
              éléments visuels et présentation générale, est la propriété de
              VentiPure ou est utilisé avec autorisation lorsque requis. Il ne
              peut être reproduit, copié ou réutilisé sans autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              5. Responsabilité
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              VentiPure ne peut être tenue responsable des dommages résultant de
              l’utilisation ou de l’impossibilité d’utiliser le site, ni des
              erreurs, interruptions ou indisponibilités temporaires du service en
              ligne. L’utilisation du site se fait sous la responsabilité de
              l’utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              6. Liens et services externes
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Le site peut utiliser ou référencer certains services externes
              nécessaires à son fonctionnement ou à l’analyse générale de son
              utilisation. VentiPure n’est pas responsable du contenu ou du
              fonctionnement des sites ou services externes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              7. Contact
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Pour toute question concernant ces modalités d’utilisation, vous
              pouvez nous écrire à{" "}
              <a
                href={CONTACT_EMAIL_URL}
                className="text-primary underline hover:text-primary/80"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            to={ROUTE_PATHS.HOME}
            className="text-primary underline hover:text-primary/80"
          >
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ModalitesDutilisation;
