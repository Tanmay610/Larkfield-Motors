import React from "react";
import { cn } from "@/lib/utils";

export interface PriceBadgeProps {
  price: string;
  line?: string;
  label?: string;
  size?: "card" | "full";
  rows?: Array<{ label: string; value: React.ReactNode }>;
  className?: string;
}

export function PriceBadge({
  price,
  line,
  label = "Our price",
  size = "card",
  rows = [],
  className = "",
}: PriceBadgeProps) {
  const isFull = size === "full";
  const Tag = isFull ? "div" : "span";

  return (
    <Tag
      className={cn(
        "inline-flex flex-col gap-1 rounded-[var(--radius-card,20px)] bg-accent text-accent-foreground",
        isFull ? "min-w-[20rem] p-6" : "-rotate-1 px-4 py-3",
        className
      )}
    >
      <span className="text-meta">{label}</span>
      <span className={cn("type-heading", isFull ? "text-h2" : "text-h4")}>{price}</span>
      {line && <span className="text-small">{line}</span>}
      {isFull && rows.length > 0 && (
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-current pt-4">
          {rows.map((row, idx) => (
            <div key={idx} className="flex flex-col">
              <dt className="text-meta">{row.label}</dt>
              <dd className="m-0">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Tag>
  );
}

