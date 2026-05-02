import { motion } from "framer-motion";
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

        <div className="divide-y divide-border">
          {items.map((faq, index) => (
            <details
              key={`${faq.q}-${index}`}
              className="group border-none py-1"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-foreground marker:hidden md:text-[15px]">
                <span>{faq.q}</span>
                <span className="shrink-0 text-lg leading-none text-muted-foreground transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}