import React from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export interface StatementSectionProps {
  eyebrow?: string;
  children: React.ReactNode;
  lede?: React.ReactNode;
  action?: React.ReactNode;
  ruled?: boolean;
  centered?: boolean;
  heading?: "h1" | "h2" | "h3";
  className?: string;
}

export function StatementSection({
  eyebrow,
  children,
  lede,
  action,
  ruled = false,
  centered = false,
  heading = "h2",
  className = "",
}: StatementSectionProps) {
  if (centered) {
    return (
      <section
        data-header="solid"
        className={cn(
          "flex flex-col items-center justify-center gap-10 bg-background px-[var(--grid-margin)] py-24 text-center text-foreground md:min-h-svh",
          className
        )}
      >
        {eyebrow && (
          <Reveal as="p" className="m-0 text-meta">
            {eyebrow}
          </Reveal>
        )}
        <Reveal
          as={heading}
          variant="rise"
          className="m-0 text-h2 lg:max-w-[calc(var(--col)*10)]"
        >
          {children}
        </Reveal>
        {lede && (
          <Reveal order={2} variant="rise" className="flex max-w-[46ch] flex-col gap-4 text-large [&_p]:m-0">
            {typeof lede === "string" ? <p>{lede}</p> : lede}
          </Reveal>
        )}
        {action && (
          <Reveal order={3} variant="rise" className="mt-10">
            {action}
          </Reveal>
        )}
      </section>
    );
  }

  return (
    <section
      data-header="solid"
      className={cn("bg-background text-foreground", className)}
    >
      <Reveal>
        <div className="flex flex-col gap-[3.75rem] px-[var(--grid-margin)] py-10 lg:py-[3.75rem]">
          {ruled && <hr className="m-0 -mb-5 h-px border-0 bg-current opacity-20" />}
          <div className={cn("flex flex-col", ruled ? "gap-11" : "gap-10")}>
            {eyebrow && <p className={cn("m-0", ruled && "text-meta")}>{eyebrow}</p>}
            <h2 className="m-0 text-h2 [font-family:var(--font-heading)] [font-weight:var(--font-heading-weight)] lg:max-w-[calc(var(--col)*11_-_var(--grid-gutter))]">
              {children}
            </h2>
          </div>
          {action && <div>{action}</div>}
        </div>
      </Reveal>
    </section>
  );
}
