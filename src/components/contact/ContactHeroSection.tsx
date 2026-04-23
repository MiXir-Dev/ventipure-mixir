import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SeoLinksParagraph } from "@/components/SeoLinksParagraph";
import { ROUTE_PATHS } from "@/consts/navigation";
import { CONTACT_AREA_SERVED_SUMMARY } from "@/consts/zones";

export function ContactHeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 md:mb-16"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
        Demandez votre soumission
      </h1>
      <p className="text-muted-foreground text-[15px]">
        Remplissez le formulaire et nous vous répondons rapidement. Service résidentiel et
        commercial à {CONTACT_AREA_SERVED_SUMMARY}.
      </p>
      <SeoLinksParagraph
        className="mt-4"
      >
        Vous pouvez aussi consulter nos{" "}
        <Link to={ROUTE_PATHS.SERVICES}>services de nettoyage de conduits de ventilation</Link> et nos{" "}
        <Link to={ROUTE_PATHS.TARIFS}>prix de nettoyage d'échangeur d'air, sécheuse et fournaise</Link> avant de
        soumettre votre demande.
      </SeoLinksParagraph>
    </motion.div>
  );
}
