import { useState } from "react";
import { Header } from "@/components/Header";
import { SidePanel } from "@/components/SidePanel";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const zones = [
  {
    region: "Montréal",
    areas: ["Plateau-Mont-Royal", "Rosemont", "Ahuntsic", "Saint-Léonard", "Ville-Marie"],
  },
  {
    region: "Longueuil et alentours",
    areas: ["Brossard", "Saint-Hubert", "Boucherville", "Saint-Lambert", "Greenfield Park"],
  },
  {
    region: "Laval et alentours",
    areas: ["Chomedey", "Sainte-Rose", "Vimont", "Pont-Viau", "Duvernay"],
  },
  {
    region: "Repentigny et alentours",
    areas: ["L'Assomption", "Le Gardeur", "Charlemagne", "Mascouche", "Terrebonne"],
  },
];

const NosServicesEtSecteurs = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header onOpenPanel={() => setPanelOpen(true)} />
        <SidePanel open={panelOpen} onClose={() => setPanelOpen(false)} />

        <main>
          {/* Hero */}
          <section className="pt-32 pb-12 md:pt-44 md:pb-16">
            <div className="vp-container max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                  Secteurs desservis
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-5 leading-[1.1]">
                  Nettoyage de ventilation à Montréal et la Rive-Sud
                </h1>
                <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xl">
                  VentiPure intervient dans les principales régions du Grand Montréal et de la Rive-Nord. Nous desservons résidences, bureaux et commerces dans les villes et quartiers ci-dessous.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Map visual */}
          <section className="pb-16 md:pb-24">
            <div className="vp-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden bg-muted/40 border border-border"
              >
                <div className="aspect-[16/8] md:aspect-[16/6]">
                  <iframe
                    src="https://www.google.com/maps/d/u/0/embed?mid=18UmReLWAVE80L9LNGiQ0KKRFoOuEn6A&ehbc=2E312F&noprof=1"
                    title="Carte des secteurs desservis par VentiPure dans le Grand Montréal"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Zones grid */}
          <section className="pb-20 md:pb-28">
            <div className="vp-container">
              <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                {zones.map((z, i) => (
                  <motion.article
                    key={z.region}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="rounded-2xl border border-border bg-card p-7 md:p-8"
                  >
                    <div className="flex items-center gap-2.5 mb-5">
                      <MapPin className="h-4 w-4 text-primary" strokeWidth={2.2} />
                      <h2 className="text-lg font-bold text-foreground tracking-tight">
                        {z.region}
                      </h2>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {z.areas.map((a) => (
                        <li
                          key={a}
                          className="text-sm text-foreground/80 px-3 py-1.5 rounded-full bg-muted/60"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="pb-20 md:pb-32">
            <div className="vp-container max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                  Votre ville n'est pas listée?
                </h2>
                <p className="text-muted-foreground text-[15px] mb-8">
                  Contactez-nous, nous évaluons chaque demande au cas par cas dans le Grand Montréal.
                </p>
                <Link to="/contact">
                  <Button variant="default" size="lg">Demander une soumission</Button>
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

export default NosServicesEtSecteurs;
