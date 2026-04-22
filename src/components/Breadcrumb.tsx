import { Fragment } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d’Ariane" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-xs font-semibold tracking-[0.16em]",
          "uppercase"
        )}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="inline-flex items-center"
              >
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    itemProp="item"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span itemProp="name" className={isLast ? "text-foreground" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>

              {!isLast && (
                <li aria-hidden="true" className="text-muted-foreground/50">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}