import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/consts/faqs";


type FaqSectionProps = {
  items: FaqItem[];
  eyebrow?: string;
  title: string;
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
};

export function FaqSection({
  items,
  eyebrow = "FAQ",
  title,
  className,
  containerClassName,
  titleClassName,
}: FaqSectionProps) {
  return (
    <section className={className}>
      <div className={cn("vp-container max-w-4xl", containerClassName)}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
            {eyebrow}
          </p>

          <h2
            className={cn(
              "text-2xl md:text-3xl font-bold text-foreground tracking-tight",
              titleClassName,
            )}
          >
            {title}
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="divide-y divide-border">
          {items.map((faq, index) => (
            <AccordionItem
              key={`${faq.q}-${index}`}
              value={`faq-${index}`}
              className="border-none py-1"
            >
              <AccordionTrigger className="text-left text-sm md:text-[15px] font-semibold text-foreground py-5 hover:no-underline">
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