import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quels services de nettoyage de ventilation offrez-vous?",
    a: "Nous offrons le nettoyage des conduits de fournaise, de l'échangeur d'air, du conduit de sécheuse et du climatiseur mural. Tous nos services sont conçus pour les résidences au Québec.",
  },
  {
    q: "Combien coûte un nettoyage de conduits de fournaise?",
    a: "Le nettoyage des conduits de fournaise est offert à partir de 349 $ et inclut jusqu'à 15 sorties de ventilation. Des frais peuvent s'appliquer selon la distance et le nombre de sorties supplémentaires.",
  },
  {
    q: "Pourquoi faire nettoyer un conduit de sécheuse?",
    a: "Un conduit de sécheuse encrassé peut nuire au fonctionnement de l'appareil, augmenter le temps de séchage et favoriser l'accumulation de charpie. Un entretien régulier aide à maintenir une utilisation plus sécuritaire.",
  },
  {
    q: "Le nettoyage d'un échangeur d'air améliore-t-il la qualité de l'air?",
    a: "Oui. Un échangeur d'air bien entretenu contribue à une meilleure circulation d'air et aide à maintenir un environnement intérieur plus sain pour toute la famille.",
  },
  {
    q: "Comment demander une soumission?",
    a: "Contactez-nous par téléphone au 438-995-2291 ou par le formulaire de contact du site. Nous vous répondrons rapidement pour valider vos besoins et planifier l'intervention.",
  },
];

export function FAQSection() {
  return (
    <section className="vp-section-padding bg-muted/20">
      <div className="vp-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Questions fréquentes
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="divide-y divide-border">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-none py-1"
            >
              <AccordionTrigger className="text-left text-sm font-semibold text-foreground py-5 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
