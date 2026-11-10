import React from "react";
import { ActionLink } from "@/components/action-link";
import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tileTones = {
  accent: {
    tile: "bg-accent text-accent-foreground",
    circle: "bg-accent-foreground text-accent",
  },
  block: {
    tile: "bg-secondary text-secondary-foreground",
    circle: "bg-secondary-foreground text-secondary",
  },
  "block-2": {
    tile: "bg-muted text-foreground",
    circle: "bg-foreground text-muted",
  },
  dark: {
    tile: "bg-primary text-primary-foreground",
    circle: "bg-primary-foreground text-primary",
  },
};

export interface TileItem {
  id: string;
  label: string;
  href: string;
  tone: "accent" | "block" | "block-2" | "dark";
}

export interface ActionTilesProps {
  title: string;
  tiles: TileItem[];
  className?: string;
}

export function ActionTiles({ title, tiles, className = "" }: ActionTilesProps) {
  return (
    <section
      data-header="solid"
      className={cn("bg-background px-[var(--grid-margin)] py-[7.5rem] text-foreground", className)}
    >
      <Reveal as="h2" variant="rise" className="m-0 mb-10 text-center text-h2">
        {title}
      </Reveal>
      <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile, idx) => (
          <Reveal as="li" key={tile.id} order={idx} variant="rise">
            <ActionLink
              href={tile.href}
              className={cn(
                "group flex h-[9.125rem] w-full items-end justify-between gap-4 rounded-[var(--radius-card,20px)] border-0 p-6",
                tileTones[tile.tone].tile
              )}
            >
              <span className="type-heading text-h4">{tile.label}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full",
                  tileTones[tile.tone].circle
                )}
              >
                <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </ActionLink>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
