import { motion } from "framer-motion";
import lifestyleProof from "@/assets/lifestyle-proof.jpg";
import serviceAction1 from "@/assets/service-action-1.jpg";

export function WhySection() {
  return (
    <section className="vp-section-padding bg-muted/30 overflow-hidden">
      <div className="vp-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">Pourquoi VentiPure</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-6 tracking-tight">
              Un entretien résidentiel<br />rigoureux et transparent
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12 max-w-md">
              VentiPure se spécialise dans le nettoyage de conduits de ventilation pour les résidences 
              au Québec. Notre approche repose sur la rigueur, la propreté et des prix affichés clairement.
            </p>

            <div className="space-y-6">
              {[
                "Spécialisation résidentielle",
                "Approche rigoureuse et propre",
                "Prix affichés, sans surprise",
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-px bg-primary/40" />
                  <span className="text-sm font-semibold text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden">
              <img
                src={lifestyleProof}
                alt="Résidence québécoise avec ventilation entretenue par VentiPure"
                className="w-full h-auto object-cover aspect-[3/4]"
                width={800}
                height={1067}
                loading="lazy"
              />
            </div>
            <div className="hidden md:block absolute -bottom-10 -right-6 w-[50%] rounded-xl overflow-hidden shadow-[0_16px_48px_-12px_hsl(var(--foreground)/0.12)] border-4 border-background">
              <img
                src={serviceAction1}
                alt="Technicien VentiPure en intervention résidentielle"
                className="w-full h-auto object-cover aspect-square"
                width={400}
                height={400}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
