import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link, type To } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageBottomCtaProps = {
  title?: string;
  description?: string;
  buttonTo: To;
  buttonLabel: string;
  className?: string;
  children?: ReactNode;
};

export function PageBottomCta({
  title,
  description,
  buttonTo,
  buttonLabel,
  className,
  children,
}: PageBottomCtaProps) {
  return (
    <section className={cn("pb-20 md:pb-32", className)}>
      <div className="vp-container max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-[15px] mb-8">{description}</p>
          )}
          {children && <div className="mb-8">{children}</div>}
          <Link to={buttonTo}>
            <Button variant="default" size="lg">
              {buttonLabel}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
