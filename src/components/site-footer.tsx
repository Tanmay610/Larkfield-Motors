import React, { useState, useEffect, useCallback, useRef } from "react";
import { ActionLink } from "@/components/action-link";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const HOLD_SECS = 2;
const FADE_MS = 500;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export interface FooterAddress {
  label: string;
  lines: string[];
  action?: React.ReactNode;
}

export interface FooterContact {
  label: string;
  text: string;
  action?: React.ReactNode;
}

export interface SiteFooterProps {
  contact: FooterContact;
  address: FooterAddress;
  photos: React.ReactNode[];
  legal?: React.ReactNode;
  social?: React.ReactNode;
  copyright: string;
  className?: string;
}

export function SiteFooter({
  contact,
  address,
  photos,
  legal,
  social,
  copyright,
  className = "",
}: SiteFooterProps) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [leavingPhoto, setLeavingPhoto] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalPhotos = photos.length;

  const advance = useCallback(() => {
    setLeavingPhoto(activePhoto);
    setActivePhoto((prev) => (prev === totalPhotos - 1 ? 0 : prev + 1));
  }, [activePhoto, totalPhotos]);

  useEffect(() => {
    if (reducedMotion || isPaused || totalPhotos <= 1) return;
    timerRef.current = setTimeout(advance, HOLD_SECS * 1000 + FADE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [advance, isPaused, reducedMotion, totalPhotos]);

  const onTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "opacity") return;
    if (e.currentTarget.dataset.state === "leaving") {
      setLeavingPhoto(null);
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <footer
      className={cn(
        "bg-background px-[var(--grid-margin)] pb-[30px] pt-[120px] text-foreground",
        className
      )}
    >
      <div className="flex flex-col gap-[50px] lg:grid lg:grid-cols-12 lg:items-start lg:gap-[var(--grid-gutter)]">
        <div className="flex flex-col lg:col-span-8">
          <p className="m-0 opacity-50">{contact.label}</p>
          <p className="type-heading m-0 mt-5 text-h3">{contact.text}</p>
          {contact.action && <div className="mt-[30px]">{contact.action}</div>}
        </div>

        <div className="relative aspect-[3/4] w-1/2 overflow-hidden lg:col-span-3 lg:col-start-10 lg:w-auto">
          {photos.map((photo, idx) => {
            const isCurrent = idx === activePhoto;
            const isLeaving = idx === leavingPhoto;
            return (
              <div
                key={idx}
                data-state={isCurrent ? "current" : isLeaving ? "leaving" : "hidden"}
                aria-hidden={isCurrent ? undefined : true}
                onTransitionEnd={onTransitionEnd}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500 [transition-timing-function:var(--site-ease)] [&>img]:h-full [&>img]:w-full [&>img]:object-cover",
                  isCurrent ? "opacity-100" : "opacity-0"
                )}
              >
                {photo}
              </div>
            );
          })}
          {totalPhotos > 1 && !reducedMotion && (
            <Button
              variant="secondary"
              size="icon"
              className="size-9 rounded-full absolute bottom-4 right-4 z-10"
              onClick={togglePause}
              aria-label={`${isPaused ? "Play" : "Pause"} footer photos`}
            >
              {isPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
            </Button>
          )}
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-5 pt-5 text-small [border-top:1px_solid_color-mix(in_srgb,currentColor_20%,transparent)] lg:grid lg:grid-cols-12 lg:gap-[var(--grid-gutter)]">
        <p className="m-0 lg:col-span-6">
          <span className="opacity-50">{address.label}</span>
          {address.lines.map((line, idx) => (
            <span key={idx}> · {line}</span>
          ))}
          {address.action && <span> · {address.action}</span>}
        </p>
        <div className="flex flex-wrap gap-x-[30px] gap-y-5 lg:col-span-6">
          {legal}
          {social}
          <p className="m-0 basis-full lg:ml-auto lg:basis-auto">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function SocialLinks() {
  return (
    <>
      {socialLinks.map((link) => (
        <ActionLink key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </ActionLink>
      ))}
    </>
  );
}
