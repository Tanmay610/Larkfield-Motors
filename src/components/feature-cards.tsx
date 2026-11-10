import React, { useRef, useState, useEffect, useCallback } from "react";
import { ActionLink } from "@/components/action-link";
import { CardAction, type CardActionItem } from "@/components/card-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Plus, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureCardData {
  id: string;
  label: React.ReactNode;
  claim: string;
  note?: string;
  media?: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  tone?: "dark" | "light";
  action?: CardActionItem;
  dialog?: {
    title: string;
    content: React.ReactNode;
  };
}

function stringify(val: React.ReactNode): string {
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  if (Array.isArray(val)) return val.map(stringify).join("");
  return "";
}

function TallCard({ card, plain }: { card: FeatureCardData; plain?: boolean }) {
  const content = (iconNode?: React.ReactNode) => (
    <>
      {card.media !== undefined && (
        <span className="feature-card-picture" aria-hidden="true">
          {card.media}
        </span>
      )}
      <span className="feature-card-shade" aria-hidden="true" />
      <span className="feature-card-words">
        <span className="feature-card-label">{card.label}</span>
        <span className="feature-card-claim">{card.claim}</span>
        {card.note !== undefined && <span className="feature-card-note">{card.note}</span>}
      </span>
      {iconNode !== undefined && (
        <span className="feature-card-disc" aria-hidden="true">
          {iconNode}
        </span>
      )}
    </>
  );

  if (card.href !== undefined) {
    return (
      <ActionLink
        href={card.href}
        className="feature-card-body absolute inset-0 flex flex-col items-stretch justify-end border-0 p-6 text-left text-white no-underline hover:no-underline min-[735px]:p-7 min-[1069px]:p-8"
      >
        {content(<ArrowUpRight className="size-4" />)}
      </ActionLink>
    );
  }

  if (plain && card.dialog === undefined) {
    return <div className="feature-card-body">{content()}</div>;
  }

  const triggerButton = (
    <button type="button" className="feature-card-body">
      {content(<Plus className="size-4" />)}
    </button>
  );

  if (card.dialog === undefined) {
    return triggerButton;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-h-[85svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{card.dialog.title}</DialogTitle>
        </DialogHeader>
        {card.dialog.content}
      </DialogContent>
    </Dialog>
  );
}

function LinkCard({ card }: { card: FeatureCardData }) {
  return (
    <ActionLink
      href={card.href ?? "#"}
      data-media={card.media === undefined ? undefined : ""}
      className="feature-card-body absolute inset-0 flex flex-col items-start justify-start border-0 p-6 text-left no-underline hover:no-underline min-[735px]:p-7 min-[1069px]:p-8"
    >
      {card.media !== undefined && (
        <span className="feature-card-picture" aria-hidden="true">
          {card.media}
        </span>
      )}
      {card.media !== undefined && <span className="feature-card-shade feature-card-shade--top" aria-hidden="true" />}
      {card.icon !== undefined && (
        <span className="feature-card-icon" aria-hidden="true">
          {card.icon}
        </span>
      )}
      <span className="feature-card-title">{card.label}</span>
      <span className="feature-card-claim">{card.claim}</span>
      <span className="feature-card-disc" aria-hidden="true">
        <ChevronRight className="size-4" />
      </span>
    </ActionLink>
  );
}

export interface FeatureCardsProps {
  cards: FeatureCardData[];
  headline?: React.ReactNode;
  label?: string;
  actionLabel?: string;
  size?: "fact" | "tall" | "link";
  more?: React.ReactNode;
  plain?: boolean;
  className?: string;
}

export function FeatureCards({
  cards,
  headline,
  label,
  actionLabel = "Learn more about",
  size = "fact",
  more,
  plain = false,
  className = "",
}: FeatureCardsProps) {
  const validCards = cards.filter((c) => c.id !== "");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= maxScroll - 1);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => ro.disconnect();
  }, [checkScroll, validCards.length]);

  const scrollByAmount = useCallback((direction: number) => {
    const scroller = scrollerRef.current;
    const row = scroller?.querySelector<HTMLElement>(".feature-cards-row");
    const card = scroller?.querySelector<HTMLElement>(".feature-card");
    if (!scroller || !row || !card) return;
    const gap = parseFloat(getComputedStyle(row).columnGap);
    const cardWidth = card.offsetWidth + (Number.isFinite(gap) ? gap : 0);
    const count = Math.max(1, Math.floor(scroller.clientWidth / cardWidth));
    scroller.scrollBy({ left: direction * count * cardWidth, behavior: "smooth" });
  }, []);

  const scrollPrev = useCallback(() => scrollByAmount(-1), [scrollByAmount]);
  const scrollNext = useCallback(() => scrollByAmount(1), [scrollByAmount]);

  if (validCards.length === 0) return null;

  return (
    <section
      className={cn("feature-cards", className)}
      data-size={size}
      aria-roledescription="carousel"
      aria-label={label}
    >
      {size === "fact" ? (
        headline !== undefined && <h2 className="feature-cards-headline">{headline}</h2>
      ) : (
        (headline !== undefined || more !== undefined) && (
          <div className="feature-cards-header">
            {headline !== undefined && <h2 className="feature-cards-headline">{headline}</h2>}
            {more !== undefined && <div>{more}</div>}
          </div>
        )
      )}

      <div
        className="feature-cards-scroller"
        ref={scrollerRef}
        onScroll={checkScroll}
        tabIndex={0}
        role="group"
        aria-label={`${validCards.length} cards`}
      >
        <div className="feature-cards-row">
          {validCards.map((card) => {
            const labelText = stringify(card.label);
            return (
              <article
                key={card.id}
                className="feature-card"
                data-tone={card.tone ?? "dark"}
                aria-roledescription="slide"
                aria-label={labelText}
              >
                {size === "tall" && <TallCard card={card} plain={plain} />}
                {size === "link" && <LinkCard card={card} />}
                {size === "fact" && card.media !== undefined && (
                  <div className="feature-card-media" aria-hidden="true">
                    {card.media}
                  </div>
                )}
                {size === "fact" && (
                  <div className="feature-card-copy">
                    <h3 className="feature-card-label">{card.label}</h3>
                    <p className="feature-card-claim">{card.claim}</p>
                  </div>
                )}
                {size === "fact" && card.action !== undefined && (
                  <CardAction
                    action={card.action}
                    headline={labelText}
                    label={`${actionLabel} ${labelText}`.trim()}
                  />
                )}
              </article>
            );
          })}
        </div>
      </div>

      {validCards.length > 1 && !(atStart && atEnd) && (
        <div className="feature-cards-controls">
          <Button
            variant="secondary"
            size="icon"
            className="size-9 rounded-full"
            onClick={scrollPrev}
            disabled={atStart}
            aria-label="Previous cards"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="size-9 rounded-full"
            onClick={scrollNext}
            disabled={atEnd}
            aria-label="Next cards"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </section>
  );
}
