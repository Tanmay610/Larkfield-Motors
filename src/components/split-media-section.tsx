import React from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export interface MediaRowItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface SplitMediaSectionProps {
  title: string;
  media: React.ReactNode;
  rows: MediaRowItem[];
  className?: string;
}

export function SplitMediaSection({
  title,
  media,
  rows,
  className = "",
}: SplitMediaSectionProps) {
  return (
    <section
      data-header="solid"
      className={cn(
        "bg-background px-[var(--grid-margin)] pb-40 pt-[calc(var(--site-header-height)_+_3.75rem)] text-foreground",
        className
      )}
    >
      <Reveal as="h1" className="m-0 text-h1 lg:w-[calc(var(--col)*11_-_var(--grid-gutter))]">
        {title}
      </Reveal>
      <div className="mt-20 flex flex-col gap-[var(--grid-gutter)] lg:mt-[180px] lg:grid lg:grid-cols-12 lg:items-start">
        <div
          className={cn(
            "relative aspect-[3/4] overflow-hidden lg:sticky lg:top-[calc(var(--site-header-height)_+_1.25rem)] lg:order-2 lg:col-span-6 lg:col-start-7",
            "[&>img]:absolute [&>img]:inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          )}
        >
          {media}
        </div>
        <div className="mt-10 flex flex-col gap-[120px] lg:order-1 lg:col-span-6 lg:mt-0">
          {rows.map((row) => (
            <div key={row.id} className="flex flex-col gap-10">
              <p className="m-0 lg:w-[calc(var(--col)*2_-_var(--grid-gutter))]">{row.label}</p>
              <div className="flex flex-col gap-[1.3em] lg:ml-[calc(var(--col)*2)] lg:w-[calc(var(--col)*3_-_var(--grid-gutter))] [&>a]:self-start [&_p]:m-0">
                {row.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

