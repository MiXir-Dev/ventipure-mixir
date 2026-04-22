import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/consts/navigation";
import { SERVICE_MARKETING_ENTRIES, SERVICE_ROUTE_BY_ID } from "@/consts/services";

const getHomeCardPrice = (priceNote: string, price: string) =>
  priceNote ? `${priceNote} ${price}` : price;

export function ServicesSection() {
  return (
    <section className="vp-section-padding bg-background">
      <div className="vp-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Nettoyage de ventilation résidentielle et commerciale
            </h2>
          </div>
          <Link
            to={ROUTE_PATHS.CONTACT}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Demander une soumission gratuite →
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 rounded-2xl overflow-hidden">
          {SERVICE_MARKETING_ENTRIES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bg-background p-8 sm:p-10 group"
            >
              <p className="text-xs font-bold text-primary tracking-wide mb-4">
                {getHomeCardPrice(service.tarifsPage.priceNote, service.tarifsPage.price)}
              </p>
              <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">
                <Link
                  to={SERVICE_ROUTE_BY_ID[service.id]}
                  className="hover:text-primary transition-colors"
                >
                  {service.servicesPage.title}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.homeDescription}</p>
              <Link
                to={SERVICE_ROUTE_BY_ID[service.id]}
                className="mt-4 inline-flex text-sm text-primary hover:text-primary/80 transition-colors"
              >
                En savoir plus sur {service.tarifsPage.title.toLowerCase()}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link to={ROUTE_PATHS.TARIFS}>
            <Button variant="outline" size="lg">Voir les tarifs de nettoyage</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
