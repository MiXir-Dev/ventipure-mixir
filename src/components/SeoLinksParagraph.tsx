import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SeoLinksParagraphProps = {
  children: ReactNode;
  className?: string;
};

export function SeoLinksParagraph({ children, className }: SeoLinksParagraphProps) {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground leading-relaxed [&_a]:text-primary [&_a]:transition-colors [&_a:hover]:text-primary/80",
        className,
      )}
    >
      {children}
    </p>
  );
}
