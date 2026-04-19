import { useState } from "react";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const tarifConduits = "/nettoyage-ventillations/tarif-conduits.jpg";
const tarifEchangeur = "/nettoyage-ventillations/tarif-echangeur.jpg";
const tarifSecheuse = "/nettoyage-ventillations/tarif-secheuse.jpg";
const tarifClimatiseur = "/nettoyage-ventillations/tarif-climatiseur.jpg";
const serviceEditorial = "/nettoyage-ventillations/service-editorial.jpg";

const services = [
  {
    title: "Conduits de fournaise",
    price: "349 $",
    priceNote: "à partir de",
    contactValue: "conduits",
    includes: "Jusqu'à 15 sorties incluses. Frais variables selon la distance et les sorties supplémentaires.",
    image: tarifConduits,
    alt: "Nettoyage de conduits de fournaise résidentielle au Québec",
  },
  {
    title: "Échangeur d'air",
    price: "249 $",
    priceNote: "",
    contactValue: "echangeur",
    includes: "Nettoyage complet du noyau, des filtres et des conduits accessibles.",
    image: tarifEchangeur,
    alt: "Nettoyage d'échangeur d'air résidentiel",
  },
  {
    title: "Conduit de sécheuse",
    price: "149 $",
    priceNote: "",
    contactValue: "secheuse",
    includes: "Retrait de la charpie et nettoyage du conduit jusqu'à la sortie extérieure.",
    image: tarifSecheuse,
    alt: "Nettoyage de conduit de sécheuse résidentielle",
  },
  {
    title: "Climatiseur mural",
    price: "249 $",
    priceNote: "",
    contactValue: "climatiseur",
    includes: "Nettoyage de l'unité murale, des filtres, de l'évaporateur et du bac de récupération.",
    image: tarifClimatiseur,
    alt: "Nettoyage de climatiseur mural résidentiel",
  },
  {
    title: "Conduits commerciaux",
    price: "Sur demande",
    priceNote: "",
    contactValue: "commercial",
    includes: "Solutions d'entretien sur mesure pour bureaux, commerces et immeubles à revenus, après estimation gratuite.",
    image: serviceEditorial,
    alt: "Nettoyage de conduits de ventilation pour bureaux et commerces au Québec",
  },
];

const Tarifs = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="vp-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-14 md:mb-20 max-w-2xl"
            >
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">Tarification</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                Tarifs résidentiels et commerciaux
              </h1>
              <p className="text-muted-foreground text-[15px]">
                Prix affichés, sans surprise. Service professionnel de nettoyage de ventilation pour résidences, bureaux et commerces au Québec.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5 md:gap-6 mb-20">
              {services.map((s, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="h-full"
                >
                  <Link
                    to={`/contact?service=${s.contactValue}`}
                    className="group block h-full rounded-2xl border border-border bg-card overflow-hidden hover:shadow-[var(--vp-shadow-card)] transition-shadow duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={s.image}
                        alt={s.alt}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 md:p-7 flex h-full flex-col">
                      <h2 className="text-lg font-bold text-foreground tracking-tight mb-3">
                        {s.title}
                      </h2>
                      <div className="flex items-baseline gap-2 mb-4">
                        {s.priceNote && (
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {s.priceNote}
                          </span>
                        )}
                        <span className="text-2xl md:text-3xl font-extrabold text-primary tabular-nums">
                          {s.price}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {s.includes}
                      </p>
                      <div className="mt-auto pt-5">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                          Demander ce service
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-sm text-muted-foreground mb-6">
                Soumission gratuite pour tous nos services de nettoyage résidentiel et commercial.
              </p>
              <Link to="/contact">
                <Button variant="default" size="lg">
                  Demander une soumission
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Tarifs;
