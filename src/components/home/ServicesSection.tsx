import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Conduits de fournaise",
    price: "à partir de 349 $",
    description: "Nettoyage complet du réseau de conduits pour une meilleure circulation d'air chaud et un système plus performant.",
  },
  {
    title: "Échangeur d'air",
    price: "249 $",
    description: "Entretien de l'échangeur pour un renouvellement d'air efficace et un environnement intérieur plus sain.",
  },
  {
    title: "Conduit de sécheuse",
    price: "149 $",
    description: "Retrait de la charpie accumulée dans le conduit pour un séchage plus rapide et une utilisation plus sécuritaire.",
  },
  {
    title: "Climatiseur mural",
    price: "249 $",
    description: "Nettoyage en profondeur de l'unité murale pour un meilleur rendement pendant les mois chauds.",
  },
  {
    title: "Conduits commerciaux",
    price: "Sur demande",
    description: "Solutions d'entretien sur mesure pour bureaux, commerces et immeubles à revenus, après estimation gratuite.",
  },
];

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
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">Services</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Nettoyage de ventilation résidentielle et commerciale
            </h2>
          </div>
          <Link
            to="/contact"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Demander un service →
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 rounded-2xl overflow-hidden">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="bg-background p-8 sm:p-10 group"
            >
              <p className="text-xs font-bold text-primary tracking-wide mb-4">{service.price}</p>
              <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
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
          <Link to="/tarifs">
            <Button variant="outline" size="lg">Voir tous les tarifs</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
