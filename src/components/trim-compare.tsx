import React from "react";
import { PriceBadge } from "@/components/price-badge";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export interface ColorSwatch {
  name: string;
  color: string;
}

export interface TrimRowDef {
  id: string;
  label: string;
}

export interface TrimItem {
  id: string;
  name: string;
  price: string;
  line?: string;
  actions?: React.ReactNode;
  media: React.ReactNode;
  rows: Record<string, React.ReactNode | ColorSwatch[]>;
}

export interface TrimCompareProps {
  id?: string;
  title: string;
  actions?: React.ReactNode;
  trims: TrimItem[];
  rows: TrimRowDef[];
  className?: string;
}

function isColorArray(val: any): val is ColorSwatch[] {
  return (
    Array.isArray(val) &&
    val.length > 0 &&
    val.every((item) => typeof item === "object" && item !== null && "color" in item && "name" in item)
  );
}

function SwatchOrValue({ value }: { value: any }) {
  if (isColorArray(value)) {
    return (
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {value.map((c) => (
          <li
            key={c.name}
            aria-label={c.name}
            title={c.name}
            className="size-6 rounded-full border border-border"
            style={{ background: c.color }}
          />
        ))}
      </ul>
    );
  }
  return <>{value}</>;
}

export function TrimCompare({
  id,
  title,
  actions,
  trims,
  rows,
  className = "",
}: TrimCompareProps) {
  const rowCount = 4 + rows.length;

  return (
    <section
      id={id}
      data-header="solid"
      className={cn(
        "scroll-mt-[var(--site-header-height)] bg-background px-[var(--grid-margin)] pb-24 pt-[7.5rem] text-foreground",
        className
      )}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <Reveal as="h2" variant="rise" className="m-0 max-w-[16ch] text-h2 [text-wrap:balance]">
          {title}
        </Reveal>
        {actions && (
          <Reveal order={1} variant="rise" className="flex flex-wrap justify-center gap-3">
            {actions}
          </Reveal>
        )}
      </div>

      <div
        className="-mx-[var(--grid-margin)] mt-16 grid auto-cols-[85%] grid-flow-col gap-x-5 gap-y-0 overflow-x-auto px-[var(--grid-margin)] [scroll-snap-type:x_mandatory] md:mx-0 md:grid-flow-row md:overflow-visible md:px-0 md:[grid-template-columns:repeat(var(--trims),minmax(0,1fr))]"
        style={
          {
            "--trims": trims.length,
            gridTemplateRows: `repeat(${rowCount}, auto)`,
          } as React.CSSProperties
        }
      >
        {trims.map((trim) => (
          <article
            key={trim.id}
            className="grid [grid-template-rows:subgrid] [scroll-snap-align:start]"
            style={{ gridRow: `span ${rowCount}` }}
          >
            <h3 className="m-0 text-h3">{trim.name}</h3>
            <PriceBadge price={trim.price} line={trim.line} className="mt-4 self-start justify-self-start" />
            <div className="mt-5 flex flex-wrap items-center gap-3">{trim.actions}</div>
            <div className="mb-8 mt-6 aspect-[16/10] overflow-hidden rounded-[var(--radius-card,20px)] bg-muted [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
              {trim.media}
            </div>
            {rows.map((row) => (
              <dl key={row.id} className="m-0 border-t border-border py-4">
                <dt className="text-meta">{row.label}</dt>
                <dd className="m-0 mt-2">
                  <SwatchOrValue value={trim.rows[row.id]} />
                </dd>
              </dl>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
