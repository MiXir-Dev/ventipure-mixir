import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
const serviceAction3 = "/nettoyage-ventillations/service-action-3.jpg";
const serviceActionPrecision = "/nettoyage-ventillations/service-action-precision.jpg";
const serviceAction4 = "/nettoyage-ventillations/service-action-4.jpg";

const slides = [
  {
    src: serviceAction3,
    alt: "Avant et après le nettoyage d'un conduit de ventilation résidentiel",
    title: "Résultats visibles immédiatement",
    caption: "Comparez l'état de vos conduits avant et après notre passage. Un air plus pur commence par des conduits impeccables.",
  },
  {
    src: serviceActionPrecision,
    alt: "Outil pneumatique en action dans un conduit de ventilation",
    title: "Précision chirurgicale",
    caption: "Nos outils pneumatiques atteignent chaque recoin de votre réseau de ventilation pour un nettoyage complet.",
  },
  {
    src: serviceAction4,
    alt: "Intérieur résidentiel et commercial lumineux avec air purifié",
    title: "Votre santé, notre priorité",
    caption: "Élimination radicale de la poussière et des allergènes pour un environnement sain, à la maison comme au bureau.",
  },
];

function GallerySection() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView();

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  return (
    <section className="vp-section-padding bg-muted/20 overflow-hidden">
      <div className="vp-container">
        <div
          ref={ref}
          className={`${inView ? "animate-fade-in" : "opacity-0"} grid lg:grid-cols-12 gap-12 lg:gap-16 items-center`}
        >
          {/* Text column */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
              Nos interventions
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-5">
              Un travail soigné, des résultats concrets
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
              Chaque intervention est réalisée avec rigueur. Nos techniciens nettoient l'ensemble
              du réseau de ventilation pour améliorer la qualité de l'air dans votre résidence.
            </p>

            {/* Slide indicators */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                className="p-2 rounded-full border border-border hover:border-primary/40 transition-colors"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-primary" : "w-3 bg-border"
                    }`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="p-2 rounded-full border border-border hover:border-primary/40 transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Image column */}
          <div className="lg:col-span-8 relative">
            <div className="rounded-2xl overflow-hidden aspect-[16/10] relative bg-muted">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={slides[current].src}
                  alt={slides[current].alt}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover absolute inset-0"
                  loading="lazy"
                  width={1280}
                  height={960}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;