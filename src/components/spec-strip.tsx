import React, { useState, useCallback } from "react";
import { ActionLink } from "@/components/action-link";
import { PriceBadge } from "@/components/price-badge";
import { Reveal } from "@/components/reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export interface VersionStat {
  label: string;
  value: React.ReactNode;
  unit?: string;
}

export interface VersionSpec {
  id: string;
  label: string;
  media: React.ReactNode;
  price: string;
  line?: string;
  stickerRows?: Array<{ label: string; value: React.ReactNode }>;
  stats: VersionStat[];
}

export interface SpecStripProps {
  label: string;
  versions: VersionSpec[];
  compareHref?: string;
  className?: string;
}

export function SpecStrip({
  label,
  versions,
  compareHref,
  className = "",
}: SpecStripProps) {
  const [selectedId, setSelectedId] = useState(versions[0]?.id ?? "");

  const onValueChange = useCallback((val: string) => {
    if (val) setSelectedId(val);
  }, []);

  const active = versions.find((v) => v.id === selectedId) ?? versions[0];
  if (!active) return null;

  return (
    <section
      data-header="solid"
      className={cn(
        "bg-secondary px-[var(--grid-margin)] py-28 text-secondary-foreground",
        className
      )}
    >
      <h2 className="m-0 mb-6 text-center text-meta">{label}</h2>

      {(versions.length > 1 || compareHref) && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {versions.length > 1 && (
            <ToggleGroup
              type="single"
              value={selectedId}
              onValueChange={onValueChange}
              aria-label={label}
              className="gap-1 rounded-full bg-background p-1"
            >
              {versions.map((v) => (
                <ToggleGroupItem
                  key={v.id}
                  value={v.id}
                  className="h-10 rounded-full px-6 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {v.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
          {compareHref && <ActionLink href={compareHref}>Compare</ActionLink>}
        </div>
      )}

      <div className="relative mx-auto mt-10 grid aspect-video w-full max-w-[60rem]">
        {versions.map((v) => (
          <div
            key={v.id}
            aria-hidden={v.id !== active.id}
            className={cn(
              "overflow-hidden rounded-[var(--radius-card,20px)] transition-opacity duration-300 [grid-area:1/1] [&>img]:h-full [&>img]:w-full [&>img]:object-cover",
              v.id === active.id ? "opacity-100" : "opacity-0"
            )}
          >
            {v.media}
          </div>
        ))}
      </div>

      <Reveal
        variant="rise"
        className="mx-auto mt-10 flex max-w-[72rem] flex-wrap items-end gap-x-12 gap-y-8 sm:justify-center"
      >
        <dl className="m-0 grid grid-cols-3 gap-x-12 gap-y-6 lg:flex lg:flex-wrap">
          {active.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col-reverse gap-1">
              <dt className="text-small opacity-70">{stat.label}</dt>
              <dd className="m-0">
                <span className="type-heading text-h3">{stat.value}</span>
                {stat.unit && <span className="ml-1 text-small">{stat.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
        <PriceBadge
          price={active.price}
          line={active.line}
          size={active.stickerRows ? "full" : "card"}
          rows={active.stickerRows}
          className="w-full sm:w-auto"
        />
      </Reveal>
    </section>
  );
}
