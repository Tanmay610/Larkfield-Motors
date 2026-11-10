import React, { useRef, useState, useEffect, useCallback } from "react";
import { ActionLink } from "@/components/action-link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  name: string;
  home?: string;
  start?: NavLinkItem[];
  end?: NavLinkItem[];
  overlay?: boolean;
  menu?: "bar" | "sheet";
  sheetGround?: string;
  sheetFoot?: React.ReactNode;
  sheetEnter?: string;
  className?: string;
}

function isTransparentColor(c: string) {
  return c === "transparent" || /rgba\(.*,\s*0\)$/.test(c);
}

export function SiteHeader({
  name,
  home = "/",
  start = [],
  end = [],
  overlay = false,
  menu = "bar",
  sheetGround = "var(--color-accent)",
  sheetFoot,
  className = "",
}: SiteHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [headerState, setHeaderState] = useState<{
    kind: "page" | "media" | "solid";
    ground?: string;
    ink?: string;
  }>({ kind: "page" });

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const intersectingElements = new Set<Element>();

    const updateState = () => {
      const target = [...intersectingElements].pop() as HTMLElement | undefined;
      if (!target) {
        setHeaderState({ kind: "page" });
        return;
      }
      if (target.dataset.header === "over-media") {
        setHeaderState({ kind: "media" });
        return;
      }
      const style = getComputedStyle(target);
      if (isTransparentColor(style.backgroundColor)) {
        setHeaderState({ kind: "page" });
      } else {
        setHeaderState({
          kind: "solid",
          ground: style.backgroundColor,
          ink: style.color,
        });
      }
    };

    const headerHeight = el.offsetHeight;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            intersectingElements.add(e.target);
          } else {
            intersectingElements.delete(e.target);
          }
        });
        updateState();
      },
      {
        rootMargin: `-${headerHeight}px 0px -${Math.max(0, window.innerHeight - headerHeight - 1)}px 0px`,
      }
    );

    document.querySelectorAll("[data-header]").forEach((node) => observer.observe(node));

    const onResize = () => {
      observer.disconnect();
      intersectingElements.clear();
      document.querySelectorAll("[data-header]").forEach((node) => observer.observe(node));
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  const solidStyle =
    headerState.kind === "solid"
      ? { backgroundColor: headerState.ground, color: headerState.ink }
      : undefined;

  const headerClass = cn(
    overlay ? "fixed inset-x-0 top-0" : "sticky top-0",
    "z-[100] flex h-[var(--site-header-height)] items-center justify-between",
    "px-[var(--grid-margin)] [font-family:var(--font-body)] transition-colors duration-100",
    headerState.kind === "page" && "bg-background text-foreground",
    headerState.kind === "media" && "bg-gradient-to-b from-black/35 to-transparent text-white",
    className
  );

  return (
    <header ref={headerRef} style={solidStyle} data-over-media={headerState.kind === "media" ? "true" : undefined} className={headerClass}>
      <nav className="hidden gap-5 lg:flex" aria-label="Primary">
        {start.map((link) => (
          <ActionLink key={link.href} href={link.href} underline="hover">
            {link.label}
          </ActionLink>
        ))}
      </nav>

      <ActionLink
        href={home}
        underline="hover"
        className={cn(
          "type-brand whitespace-nowrap text-small [font-family:var(--font-heading)] [font-weight:var(--font-heading-weight)]",
          "lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        )}
      >
        {name}
      </ActionLink>

      <div className="flex items-center gap-5">
        <nav className="flex gap-5" aria-label="Secondary">
          {end.map((link) => (
            <ActionLink key={link.href} href={link.href} underline="hover">
              {link.label}
            </ActionLink>
          ))}
        </nav>

        {start.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="h-auto p-0 text-inherit hover:bg-transparent hover:text-inherit lg:hidden"
              >
                Menu
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background text-foreground">
              <DialogTitle className="type-brand text-small [font-family:var(--font-heading)] [font-weight:var(--font-heading-weight)]">
                {name}
              </DialogTitle>
              <DialogDescription className="sr-only">Site navigation</DialogDescription>
              <nav className="grid gap-4 pt-2 text-h2 [font-family:var(--font-heading)]" aria-label="Menu">
                {[...start, ...end].map((link) => (
                  <ActionLink key={link.href} href={link.href} underline="hover" className="justify-self-start">
                    {link.label}
                  </ActionLink>
                ))}
              </nav>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </header>
  );
}
