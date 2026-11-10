import React, { useState, useCallback } from "react";
import { ActionLink } from "@/components/action-link";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export interface ProductRowItem {
  id: string;
  name: React.ReactNode;
  detail?: string;
  href: string;
  image: React.ReactNode;
  hoverImage?: React.ReactNode;
}

const imageOverlayClass =
  "absolute inset-0 transition-opacity duration-500 [transition-timing-function:var(--site-ease)] [&>img]:h-full [&>img]:w-full [&>img]:object-cover";

function ProductCard({ item }: { item: ProductRowItem }) {
  const [hovered, setHovered] = useState(false);
  const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  const onMouseEnter = useCallback(() => {
    if (canHover) setHovered(true);
  }, [canHover]);

  const onMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <li className="flex flex-col gap-3" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <ActionLink
        href={item.href}
        className="relative block aspect-[3/4] overflow-hidden border-0 bg-muted"
        aria-label={typeof item.name === "string" ? item.name : undefined}
      >
        <span className={cn(imageOverlayClass, hovered && item.hoverImage ? "opacity-0" : "opacity-100")}>
          {item.image}
        </span>
        {item.hoverImage && (
          <span
            className={cn(imageOverlayClass, hovered ? "opacity-100" : "opacity-0")}
            aria-hidden="true"
          >
            {item.hoverImage}
          </span>
        )}
      </ActionLink>
      <div className="flex flex-col gap-0.5">
        <h3 className="m-0 text-h3 [font-family:var(--font-heading)] [font-weight:var(--font-heading-weight)]">
          {item.name}
        </h3>
        {item.detail && <p className="m-0 text-muted-foreground">{item.detail}</p>}
      </div>
    </li>
  );
}

export interface ProductRowProps {
  title?: string;
  action?: React.ReactNode;
  items: ProductRowItem[];
  className?: string;
}

export function ProductRow({ title, action, items, className = "" }: ProductRowProps) {
  return (
    <section data-header="solid" className={cn("bg-background text-foreground", className)}>
      <Reveal>
        <div className="flex flex-col gap-8 px-[var(--grid-margin)] py-10 lg:py-[3.75rem]">
          {(title || action) && (
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-[var(--grid-gutter)]">
              {title && (
                <h2 className="m-0 text-h2 [font-family:var(--font-heading)] [font-weight:var(--font-heading-weight)]">
                  {title}
                </h2>
              )}
              {action && <div>{action}</div>}
            </div>
          )}
          <ul className="m-0 grid list-none grid-cols-1 gap-10 p-0 lg:grid-cols-3 lg:gap-[var(--grid-gutter)]">
            {items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
