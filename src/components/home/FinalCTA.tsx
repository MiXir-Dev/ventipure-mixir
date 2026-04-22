import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/consts/navigation";

export function FinalCTA() {
  return (
    <section className="py-28 md:py-36 bg-muted/30">
      <div className="vp-container max-w-2xl text-center mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-5 tracking-tight">
            Prêt à respirer un air plus sain?
          </h2>
          <p className="text-muted-foreground mb-10">
            Obtenez votre soumission gratuite pour le nettoyage de vos conduits de ventilation.
          </p>
          <Link to={ROUTE_PATHS.CONTACT}>
            <Button variant="default" size="lg">
              Nous contacter
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
