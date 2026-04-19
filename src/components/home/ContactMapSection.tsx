import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function ContactMapSection() {
  return (
    <section className="vp-section-padding bg-background">
      <div className="vp-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:py-4"
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
              Nous joindre
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-10">
              Contactez VentiPure
            </h2>

            <div className="space-y-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-2">
                  Téléphone
                </p>
                <a
                  href="tel:4389952291"
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                >
                  438-995-2291
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-2">
                  Courriel
                </p>
                <a
                  href="mailto:info@ventipure.ca"
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                >
                  info@ventipure.ca
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-2">
                  Adresse
                </p>
                <p className="text-[15px] text-foreground leading-relaxed">
                  2151, rue Leonardo da Vinci<br />
                  Sainte-Julie, Québec J3E 1Z3
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 mb-2">
                  Secteurs desservis
                </p>
                <p className="text-[15px] text-foreground leading-relaxed">
                  Montréal, Laval, Longueuil, Sainte-Julie,<br />
                  Rive-Sud et les environs
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Link
                to="/contact"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Demander une soumission gratuite →
              </Link>
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[3/4] shadow-[var(--vp-shadow-card)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2810.6!2d-73.3387!3d45.5018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc904c7b7e4e1d7%3A0x0!2s2151+Rue+Leonardo-Da-Vinci%2C+Sainte-Julie%2C+QC+J3E+1Z3!5e0!3m2!1sfr!2sca!4v1700000000000!5m2!1sfr!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Emplacement de VentiPure à Sainte-Julie, Québec"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
