import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/consts/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CONTACT_EMAIL, CONTACT_EMAIL_URL } from "@/consts/contact";

const PolitiqueDeConfidentialite = () => {
  return (
    <main className="min-h-screen bg-background pt-16 pb-16">
      <div className="vp-container max-w-3xl">
        <Breadcrumb
          className="mb-6"
          items={[
            { label: "Accueil", to: ROUTE_PATHS.HOME },
            { label: "Politique de confidentialité" },
          ]}
        />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          Politique de confidentialité
        </p>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
          Politique de confidentialité
        </h1>

        <p className="text-muted-foreground text-[15px] leading-relaxed mb-4">
          Chez VentiPure, nous accordons une grande importance à la protection de
          vos renseignements personnels. Cette page explique de façon simple
          quelles informations peuvent être recueillies sur notre site, pourquoi
          elles le sont, et comment elles sont utilisées.
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              1. Informations recueillies
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Lorsque vous remplissez notre formulaire de contact, nous pouvons
              recueillir les informations que vous choisissez de nous transmettre,
              comme votre nom, votre adresse, votre numéro de téléphone, votre
              courriel et les détails liés à votre demande de service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              2. Utilisation des informations
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Les informations envoyées par le formulaire sont utilisées
              uniquement à l’interne afin de traiter votre demande, communiquer
              avec vous et planifier un rendez-vous ou une soumission lorsque
              nécessaire.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              3. Mesure d’audience
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Nous utilisons Google Analytics afin de mieux comprendre
              l’utilisation générale du site, par exemple les pages visitées ou
              les actions effectuées sur le site. Ces données nous servent à
              améliorer l’expérience utilisateur et le contenu du site. Nous ne
              cherchons pas à identifier personnellement qui fait quoi sur le
              site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              4. Partage des renseignements
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Nous ne vendons pas vos renseignements personnels et nous ne les
              utilisons pas à des fins publicitaires tierces. Les informations
              transmises via le formulaire sont traitées à l’interne dans le seul
              but de répondre à votre demande.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">
              6. Vos questions
            </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Pour toute question concernant cette politique de confidentialité ou
              le traitement de vos informations, vous pouvez communiquer avec
              nous à l’adresse suivante :{" "}
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

export default PolitiqueDeConfidentialite;