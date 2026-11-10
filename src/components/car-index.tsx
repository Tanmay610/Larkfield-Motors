import React, { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ActionLink } from "@/components/action-link";
import { PriceBadge } from "@/components/price-badge";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const formatPrice = (val: number) => `$${val.toLocaleString("en-US")}`;

interface FilterTabProps {
  id: string;
  label: string;
  count: number;
  from?: string;
  chosen: boolean;
  onChoose: (id: string) => void;
}

function FilterTab({ id, label, count, from, chosen, onChoose }: FilterTabProps) {
  const onClick = useCallback(() => {
    onChoose(id);
  }, [id, onChoose]);

  return (
    <li className="shrink-0">
      <Button
        type="button"
        variant="ghost"
        aria-pressed={chosen}
        onClick={onClick}
        className={cn(
          "h-auto flex-col items-start gap-1 rounded-none border-b-4 px-0 py-2 text-left hover:bg-transparent",
          chosen ? "border-accent" : "border-transparent opacity-60 hover:opacity-100",
          count === 0 && "opacity-30"
        )}
      >
        <span className="type-heading text-h3">{label}</span>
        <span className="text-small opacity-70">
          {count}
          {from ? ` · from ${from}` : ""}
        </span>
      </Button>
    </li>
  );
}

export interface CarTypeFilter {
  id: string;
  label: string;
  text?: string;
}

export interface CarIndexItem {
  id: string;
  type: string;
  name: string;
  price: number;
  line?: string;
  facts?: string;
  image: React.ReactNode;
  href: string;
  isNew?: boolean;
}

export interface CarIndexProps {
  title: string;
  types: CarTypeFilter[];
  cars: CarIndexItem[];
  empty?: string;
  className?: string;
}

export function CarIndex({
  title,
  types,
  cars,
  empty = "No cars found.",
  className = "",
}: CarIndexProps) {
  const defaultType = types[0]?.id;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParam = searchParams.get("type");
  const selectedType = types.some((t) => t.id === currentParam) ? currentParam! : defaultType;

  const onChooseType = useCallback(
    (typeId: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (typeId === defaultType) {
            next.delete("type");
          } else {
            next.set("type", typeId);
          }
          return next;
        },
        { replace: true, preventScrollReset: true }
      );
    },
    [defaultType, setSearchParams]
  );

  const filterCars = useCallback(
    (typeId: string) => {
      return typeId === defaultType ? cars : cars.filter((c) => c.type === typeId);
    },
    [defaultType, cars]
  );

  const displayedCars = useMemo(() => filterCars(selectedType), [selectedType, filterCars]);
  const activeTypeInfo = types.find((t) => t.id === selectedType);

  return (
    <div className={className}>
      <section
        data-header="solid"
        className="bg-background px-[var(--grid-margin)] pb-12 pt-[calc(var(--site-header-height)+3rem)] text-foreground"
      >
        <Reveal as="h1" variant="rise" className="m-0 text-h1 max-sm:text-h2">
          {title}
        </Reveal>
        <div className="mt-12 flex flex-col gap-6">
          <ul className="m-0 flex list-none gap-8 overflow-x-auto p-0 lg:flex-wrap lg:gap-x-12 lg:gap-y-6 lg:overflow-visible">
            {types.map((t) => {
              const matches = filterCars(t.id);
              const minPrice = matches.length
                ? formatPrice(Math.min(...matches.map((m) => m.price)))
                : undefined;
              return (
                <FilterTab
                  key={t.id}
                  id={t.id}
                  label={t.label}
                  count={matches.length}
                  from={minPrice}
                  chosen={t.id === selectedType}
                  onChoose={onChooseType}
                />
              );
            })}
          </ul>
          {activeTypeInfo?.text && (
            <p className="m-0 max-w-[40ch] text-large opacity-80">{activeTypeInfo.text}</p>
          )}
        </div>
      </section>

      <section
        data-header="solid"
        className="bg-background px-[var(--grid-margin)] pb-[120px] text-foreground"
      >
        {displayedCars.length === 0 ? (
          <p className="m-0 py-10 text-large opacity-60">{empty}</p>
        ) : (
          <ul className="m-0 grid list-none grid-cols-1 gap-x-[var(--grid-gutter)] gap-y-14 p-0 lg:grid-cols-12">
            {displayedCars.map((car, idx) => (
              <Reveal
                as="li"
                key={car.id}
                variant="rise"
                className={cn("lg:col-span-4", idx === 0 && "lg:col-span-8")}
              >
                <ActionLink href={car.href} className="flex flex-col items-start border-0 text-left">
                  <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card,20px)] bg-muted [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
                    {car.image}
                    <PriceBadge
                      price={formatPrice(car.price)}
                      line={car.line}
                      label={car.isNew ? "Just in" : "Our price"}
                      className="absolute bottom-3 left-3"
                    />
                  </span>
                  <span className="type-heading mt-4 block text-h4">{car.name}</span>
                  {car.facts && <span className="mt-1 block opacity-70">{car.facts}</span>}
                </ActionLink>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
