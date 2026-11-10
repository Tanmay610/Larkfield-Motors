import React from "react";
import { WordReveal, Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export interface CenterHeroProps {
  media: React.ReactNode;
  title: string | React.ReactNode;
  action?: React.ReactNode;
  ink?: string;
  className?: string;
}

export function CenterHero({
  media,
  title,
  action,
  ink = "var(--color-accent)",
  className = "",
}: CenterHeroProps) {
  return (
    <section
      data-header="over-media"
      className={cn(
        "relative grid h-svh min-h-[36rem] place-items-center overflow-hidden bg-black",
        className
      )}
    >
      <div className="absolute inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
        {media}
      </div>
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      <div
        className="relative flex max-w-[754px] flex-col items-center gap-6 px-[var(--grid-margin)] text-center"
        style={{ color: ink }}
      >
        {typeof title === "string" ? (
          <WordReveal as="h1" baseDelayMs={120} className="m-0 text-h1 [text-wrap:balance]">
            {title}
          </WordReveal>
        ) : (
          <h1 className="m-0 text-h1 [text-wrap:balance]">{title}</h1>
        )}
        {action && (
          <Reveal order={4} variant="rise" className="text-meta">
            {action}
          </Reveal>
        )}
      </div>
    </section>
  );
}
