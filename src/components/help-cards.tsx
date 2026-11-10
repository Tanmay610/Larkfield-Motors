import React from "react";
import { ActionLink } from "@/components/action-link";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export interface HelpCardItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface HelpCardsProps {
  title: string;
  cards: HelpCardItem[];
  className?: string;
}

export function HelpCards({ title, cards, className = "" }: HelpCardsProps) {
  return (
    <section
      data-header="solid"
      className={cn("bg-background px-[var(--grid-margin)] py-[7.5rem] text-foreground", className)}
    >
      <Reveal as="h2" variant="rise" className="m-0 mb-10 text-h2">
        {title}
      </Reveal>
      <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <Reveal as="li" key={card.id} order={idx} variant="rise" className="flex">
            <article className="flex w-full flex-col gap-4 rounded-[var(--radius-card,20px)] bg-primary p-6 text-primary-foreground">
              <span aria-hidden="true" className="[&>svg]:size-6">
                {card.icon}
              </span>
              <h3 className="m-0 text-h4">{card.title}</h3>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {card.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <ActionLink href={link.href} underline="hover">
                      {link.label}
                    </ActionLink>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
