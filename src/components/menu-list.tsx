import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export interface MenuItem {
  id: string;
  name: string;
  price?: string;
  text?: React.ReactNode;
}

export interface MenuGroup {
  id: string;
  label: string;
  items: MenuItem[];
}

export interface MenuListProps {
  title?: string;
  groups: MenuGroup[];
  note?: string;
  size?: "menu" | "faq";
  className?: string;
}

function AccordionColumn({ items, isFaq }: { items: MenuItem[]; isFaq: boolean }) {
  return (
    <Accordion type="multiple" className="lg:col-span-6">
      {items.map((item, idx) => (
        <Reveal key={item.id} order={idx} variant="rise">
          <AccordionItem
            value={item.id}
            className="border-0 [border-bottom:1px_solid_color-mix(in_srgb,currentColor_20%,transparent)] [&_h3]:!m-0 [&_h3]:!text-[length:inherit] [&_h3]:![font-family:inherit] [&_h3]:![font-weight:inherit] [&_h3]:![letter-spacing:inherit] [&_h3]:![line-height:inherit]"
          >
            <AccordionTrigger
              className={cn(
                "gap-5 text-left font-normal hover:no-underline [&>svg]:hidden [&[data-state=open]>.menu-plus]:rotate-45",
                isFaq ? "py-4 text-large" : "type-heading py-5 text-h3"
              )}
            >
              <span className="flex-1">{item.name}</span>
              {item.price && <span className="text-h4">{item.price}</span>}
              <span
                className={cn(
                  "menu-plus transition-transform duration-200 motion-reduce:transition-none",
                  isFaq ? "text-large" : "text-h4"
                )}
                aria-hidden="true"
              >
                +
              </span>
            </AccordionTrigger>
            {item.text && (
              <AccordionContent className="pb-5 text-[length:inherit]">
                {item.text}
              </AccordionContent>
            )}
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
  );
}

export function MenuList({
  title,
  groups,
  note,
  size = "menu",
  className = "",
}: MenuListProps) {
  const isFaq = size === "faq";

  return (
    <section
      data-header="solid"
      className={cn(
        "bg-background px-[var(--grid-margin)] pb-[120px] text-foreground",
        title
          ? "pt-[calc(var(--site-header-height)_+_3.75rem)]"
          : isFaq
          ? "pt-[7.5rem]"
          : "pt-10 lg:pt-[3.75rem]",
        className
      )}
    >
      {title && <h1 className="type-heading m-0 mb-20 text-h1">{title}</h1>}
      <div className="flex flex-col gap-20">
        {groups.map((group) => {
          const half = Math.ceil(group.items.length / 2);
          return (
            <div key={group.id}>
              {!isFaq && <hr className="m-0 mb-10 h-px border-0 bg-current opacity-20" />}
              <h2 className={cn("m-0", isFaq ? "mb-16 text-h3" : "text-meta mb-6")}>
                {group.label}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-[var(--grid-gutter)]">
                <AccordionColumn items={group.items.slice(0, half)} isFaq={isFaq} />
                <AccordionColumn items={group.items.slice(half)} isFaq={isFaq} />
              </div>
            </div>
          );
        })}
      </div>
      {note && <p className="m-0 mt-10">{note}</p>}
    </section>
  );
}
