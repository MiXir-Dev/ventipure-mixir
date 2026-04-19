import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import serviceConduits from "@/assets/service-conduits.jpg";
import serviceEchangeur from "@/assets/service-echangeur.jpg";
import serviceSecheuse from "@/assets/service-secheuse.jpg";
import serviceClimatiseur from "@/assets/service-climatiseur.jpg";
import serviceEditorial from "@/assets/service-editorial.jpg"; // used as fallback for commercial card

const services = [
  {
    id: "conduits",
    title: "Nettoyage des conduits de fournaise",
    price: "À partir de 349 $",
    contactValue: "conduits",
    description:
      "Ce service cible les conduits de ventilation reliés à votre fournaise résidentielle. Le nettoyage professionnel permet de réduire l'accumulation de poussière et de favoriser une meilleure circulation de l'air dans toute la maison.",
    benefits: [
      "Jusqu'à 15 sorties incluses",
      "Amélioration de la circulation de l'air",
      "Entretien du système résidentiel",
    ],
    image: serviceConduits,
    alt: "Technicien nettoyant les conduits de fournaise dans une maison résidentielle au Québec",
  },
  {
    id: "echangeur",
    title: "Nettoyage de l'échangeur d'air",
    price: "249 $",
    contactValue: "echangeur",
    description:
      "Le nettoyage de l'échangeur d'air contribue à un meilleur renouvellement de l'air intérieur et au bon fonctionnement de l'appareil. Ce service comprend le noyau, les filtres et les conduits accessibles.",
    benefits: [
      "Air intérieur plus sain",
      "Meilleur fonctionnement de l'appareil",
      "Entretien préventif utile",
    ],
    image: serviceEchangeur,
    alt: "Nettoyage professionnel d'un échangeur d'air résidentiel",
  },
  {
    id: "secheuse",
    title: "Nettoyage du conduit de sécheuse",
    price: "149 $",
    contactValue: "secheuse",
    description:
      "Le retrait de la charpie et des résidus accumulés dans le conduit de sécheuse aide à maintenir une meilleure performance de l'appareil et contribue à une utilisation résidentielle plus sécuritaire.",
    benefits: [
      "Réduction du temps de séchage",
      "Moins d'accumulation de charpie",
      "Entretien important pour la sécurité",
    ],
    image: serviceSecheuse,
    alt: "Nettoyage du conduit de sécheuse dans une résidence québécoise",
  },
  {
    id: "climatiseur",
    title: "Nettoyage d'air climatisé mural",
    price: "249 $",
    contactValue: "climatiseur",
    description:
      "Le nettoyage de l'unité murale comprend les filtres, l'évaporateur et le bac de récupération. Ce service aide à réduire les odeurs, à améliorer la propreté de l'air et à maintenir une meilleure performance de refroidissement.",
    benefits: [
      "Air plus propre",
      "Réduction des odeurs",
      "Meilleure performance de l'unité",
    ],
    image: serviceClimatiseur,
    alt: "Nettoyage d'un climatiseur mural résidentiel",
  },
  {
    id: "commercial",
    title: "Nettoyage de conduits commerciaux",
    price: "Sur estimation",
    contactValue: "commercial",
    description:
      "Solutions d'entretien sur mesure pour bureaux, commerces et bâtiments industriels. Nous évaluons votre réseau de ventilation et préparons une estimation adaptée à vos espaces et à votre horaire d'opération.",
    benefits: [
      "Expertise pour bureaux, commerces et bâtiments industriels",
      "Estimation gratuite sur place ou à distance",
      "Interventions planifiées selon vos heures d'ouverture",
    ],
    image: serviceEditorial,
    alt: "Nettoyage de conduits de ventilation commerciaux pour bureaux et commerces au Québec",
  },
];

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
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact">
                    <Button variant="default" size="lg">
                      Demander une soumission
                    </Button>
                  </Link>
                  <Link to="/tarifs">
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
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className="px-4 py-2.5 rounded-full border border-border text-sm font-medium text-foreground/80 hover:border-primary hover:text-primary transition-colors duration-200"
                    >
                      {s.title.replace("Nettoyage des ", "").replace("Nettoyage de l'", "").replace("Nettoyage du ", "").replace("Nettoyage d'", "")}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Service sections */}
          {services.map((s, i) => {
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
                          src={s.image}
                          alt={s.alt}
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
                        {s.price}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4 leading-tight">
                        {s.title}
                      </h2>
                      <p className="text-muted-foreground text-[15px] leading-relaxed mb-6">
                        {s.description}
                      </p>
                      <ul className="space-y-2.5 mb-8">
                        {s.benefits.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-sm text-foreground/80"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Link to={`/contact?service=${s.contactValue}`}>
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
                <Link to="/contact">
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
