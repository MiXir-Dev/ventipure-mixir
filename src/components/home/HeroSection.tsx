import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroMain from "@/assets/hero-main.jpg";
import heroSecondary from "@/assets/hero-secondary.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 bg-background">
      <div className="vp-container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-5 pb-8 lg:pb-16"
          >
            <h1 className="text-[2rem] sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.1] text-foreground mb-6 tracking-tight">
              Nettoyage de ventilation{" "}
              <span className="vp-gradient-text">résidentielle et commerciale</span>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-sm">
              Conduits de fournaise, échangeur d'air, sécheuse, climatiseur mural et conduits commerciaux.
              Un service professionnel pour un air intérieur plus sain au Québec.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button variant="default" size="lg">Demander une soumission</Button>
              </Link>
              <Link to="/tarifs">
                <Button variant="outline" size="lg">Voir les tarifs</Button>
              </Link>
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_hsl(var(--foreground)/0.1)]">
                <img
                  src={heroMain}
                  alt="Intérieur résidentiel lumineux après nettoyage de ventilation"
                  className="w-full h-auto object-cover aspect-[4/3]"
                  width={1280}
                  height={960}
                />
              </div>
              <div className="hidden sm:block absolute -bottom-8 -left-8 w-[45%] rounded-xl overflow-hidden shadow-[0_16px_48px_-12px_hsl(var(--foreground)/0.15)] border-4 border-background">
                <img
                  src={heroSecondary}
                  alt="Conduit de ventilation résidentiel nettoyé"
                  className="w-full h-auto object-cover aspect-[4/3]"
                  width={600}
                  height={450}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
