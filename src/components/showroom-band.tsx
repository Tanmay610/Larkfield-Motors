import React from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export interface ShowroomCard {
  status?: string;
  name?: string;
  address?: string[];
  hours?: string[];
  media?: React.ReactNode;
  actions?: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
}

export interface ShowroomBandProps {
  media: React.ReactNode;
  title: string;
  lede?: string;
  showroom?: ShowroomCard;
  card?: ShowroomCard;
  className?: string;
}

export function ShowroomBand({
  media,
  title,
  lede,
  showroom,
  card,
  className = "",
}: ShowroomBandProps) {
  const hasPanels = !!(showroom || card);

  return (
    <section
      data-header="over-media"
      className={cn(
        "relative flex flex-col overflow-hidden bg-black text-white",
        hasPanels ? "min-h-[160svh]" : "min-h-svh",
        className
      )}
    >
      <div className="absolute inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
        {media}
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 via-45% to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center gap-6 px-[var(--grid-margin)] pb-24 pt-[calc(var(--site-header-height)+4rem)] text-center">
        <Reveal as="h2" variant="rise" className="m-0 max-w-[18ch] text-h1 max-sm:text-h2 [text-wrap:balance]">
          {title}
        </Reveal>
        {lede && (
          <Reveal as="p" order={1} variant="rise" className="m-0 max-w-[44ch] text-large opacity-90">
            {lede}
          </Reveal>
        )}
      </div>

      {hasPanels && (
        <div className="relative mt-auto flex flex-col gap-6 px-[var(--grid-margin)] pb-16 lg:grid lg:grid-cols-12 lg:items-end lg:gap-[var(--grid-gutter)]">
          {showroom && (
            <Reveal
              variant="rise"
              className="flex flex-col gap-6 rounded-[var(--radius-card,20px)] bg-card p-8 text-card-foreground lg:col-span-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-meta text-accent-foreground font-semibold">{showroom.status}</span>
                <span className="type-heading text-h4">{showroom.name}</span>
              </div>
              {showroom.media && (
                <div className="aspect-[16/9] overflow-hidden rounded-[var(--radius-card,20px)] [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
                  {showroom.media}
                </div>
              )}
              {showroom.address && (
                <div className="text-small opacity-80">
                  {showroom.address.map((line, idx) => (
                    <p key={idx} className="m-0">
                      {line}
                    </p>
                  ))}
                </div>
              )}
              {showroom.hours && (
                <div className="text-small opacity-80">
                  {showroom.hours.map((h, idx) => (
                    <p key={idx} className="m-0">
                      {h}
                    </p>
                  ))}
                </div>
              )}
              {showroom.actions && <div className="flex flex-wrap gap-4 pt-2">{showroom.actions}</div>}
            </Reveal>
          )}

          {card && (
            <Reveal
              order={1}
              variant="rise"
              className="flex flex-col gap-6 rounded-[var(--radius-card,20px)] bg-card p-8 text-card-foreground lg:col-span-6"
            >
              {card.title && <h3 className="type-heading m-0 text-h3">{card.title}</h3>}
              {card.media && (
                <div className="aspect-[16/9] overflow-hidden rounded-[var(--radius-card,20px)] [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
                  {card.media}
                </div>
              )}
              {card.action && <div className="mt-auto pt-2">{card.action}</div>}
            </Reveal>
          )}
        </div>
      )}
    </section>
  );
}
