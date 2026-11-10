import React from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export interface ContactWay {
  id: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  action: React.ReactNode;
}

export interface ContactDetailsSectionProps {
  id?: string;
  title: string;
  lede?: string;
  ways: ContactWay[];
  formTitle: string;
  form: React.ReactNode;
  className?: string;
}

export function ContactDetailsSection({
  id,
  title,
  lede,
  ways,
  formTitle,
  form,
  className = "",
}: ContactDetailsSectionProps) {
  return (
    <section
      id={id}
      data-header="solid"
      className={cn(
        "scroll-mt-[var(--site-header-height)] bg-secondary px-[var(--grid-margin)] py-24 text-secondary-foreground lg:py-[7.5rem]",
        className
      )}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-[var(--grid-gutter)]">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <div className="flex flex-col gap-5">
            <Reveal as="h2" variant="rise" className="m-0 text-h2">
              {title}
            </Reveal>
            {lede && (
              <Reveal as="p" order={1} variant="rise" className="m-0 max-w-[32ch] text-large">
                {lede}
              </Reveal>
            )}
          </div>
          <ul className="m-0 flex list-none flex-col p-0">
            {ways.map((way, idx) => (
              <Reveal
                as="li"
                key={way.id}
                order={idx + 2}
                variant="rise"
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-border py-6 last:border-b"
              >
                <span aria-hidden="true" className="pt-1 [&>svg]:size-6">
                  {way.icon}
                </span>
                <div className="flex flex-col items-start gap-2">
                  <h3 className="m-0 text-h4">{way.title}</h3>
                  <p className="m-0">{way.text}</p>
                  {way.action}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal
          order={2}
          variant="rise"
          className="rounded-[var(--radius-card,20px)] bg-card p-6 text-card-foreground sm:p-10 lg:col-span-6 lg:col-start-7 lg:self-start"
        >
          <h3 className="m-0 mb-6 text-h4">{formTitle}</h3>
          {form}
        </Reveal>
      </div>
    </section>
  );
}

export { ContactDetailsSection as ContactDetails };
