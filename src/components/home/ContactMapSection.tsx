import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/consts/navigation";
import { CONTACT_AREA_SERVED_LINE_1, CONTACT_AREA_SERVED_LINE_2 } from "@/consts/zones";

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
                  {CONTACT_AREA_SERVED_LINE_1},<br />
                  {CONTACT_AREA_SERVED_LINE_2}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex flex-col gap-3">
                <Link
                  to={ROUTE_PATHS.CONTACT}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Demander une soumission gratuite →
                </Link>
                <Link
                  to={ROUTE_PATHS.SECTEURS}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Voir les secteurs de nettoyage de conduits à Montréal et alentours →
                </Link>
              </div>
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
                src="https://www.google.com/maps/d/u/0/embed?mid=18UmReLWAVE80L9LNGiQ0KKRFoOuEn6A&ehbc=2E312F&noprof=1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte des zones desservies par VentiPure"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
