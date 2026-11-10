import React from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export interface SizeItem {
  label: string;
  value: string;
  unit?: string;
}

export interface SizeChartProps {
  title: string;
  sizes: SizeItem[];
  className?: string;
}

export function SizeChart({ title, sizes, className = "" }: SizeChartProps) {
  return (
    <section
      data-header="solid"
      className={cn("bg-primary px-[var(--grid-margin)] py-[7.5rem] text-primary-foreground", className)}
    >
      <Reveal as="h2" variant="rise" className="m-0 text-center text-h2">
        {title}
      </Reveal>
      <dl className="mx-auto mb-0 mt-16 grid max-w-[72rem] grid-cols-2 gap-x-[var(--grid-gutter)] gap-y-12 lg:grid-cols-3">
        {sizes.map((s, idx) => (
          <Reveal
            order={idx}
            variant="rise"
            key={idx}
            className="flex flex-col-reverse gap-2 border-t border-current pt-5"
          >
            <dt className="text-small opacity-70">{s.label}</dt>
            <dd className="m-0">
              <span className="type-heading text-h3">{s.value}</span>
              {s.unit && <span className="ml-2 text-large">{s.unit}</span>}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
