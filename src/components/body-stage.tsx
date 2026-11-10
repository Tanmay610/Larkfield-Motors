import React, { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_SMOOTHING = 0.3;
const EPSILON = 0.0005;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useStageProgress(
  targetRef: React.RefObject<HTMLElement>,
  {
    smoothing = DEFAULT_SMOOTHING,
    still = false,
    onProgress,
  }: {
    smoothing?: number;
    still?: boolean;
    onProgress?: (val: number) => void;
  } = {}
) {
  const animFrame = useRef<number | null>(null);
  const currentVal = useRef(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    if (still) {
      el.style.setProperty("--stage-progress", "0");
      onProgress?.(0);
      return;
    }

    const calcTarget = () => {
      const rect = el.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return 0;
      return Math.min(1, Math.max(0, -rect.top / scrollableHeight));
    };

    const tick = () => {
      const target = calcTarget();
      const next = currentVal.current + (target - currentVal.current) * smoothing;
      currentVal.current = Math.abs(target - next) < EPSILON ? target : next;
      el.style.setProperty("--stage-progress", currentVal.current.toFixed(4));
      onProgress?.(currentVal.current);
      animFrame.current = currentVal.current === target ? null : requestAnimationFrame(tick);
    };

    const trigger = () => {
      if (animFrame.current === null) {
        animFrame.current = requestAnimationFrame(tick);
      }
    };

    tick();
    window.addEventListener("scroll", trigger, { passive: true });
    window.addEventListener("resize", trigger, { passive: true });
    const ro = new ResizeObserver(trigger);
    ro.observe(el);

    return () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("resize", trigger);
      ro.disconnect();
      if (animFrame.current !== null) {
        cancelAnimationFrame(animFrame.current);
        animFrame.current = null;
      }
    };
  }, [targetRef, smoothing, still, onProgress]);
}

export interface BodyStageItem {
  id: string;
  word: string;
  media: React.ReactNode;
  line: string;
  from: string;
  count: string;
  actions: React.ReactNode;
}

interface BodyStageFigureProps {
  body: BodyStageItem;
  shown: boolean;
  stacked: boolean;
}

function BodyStageFigure({ body, shown, stacked }: BodyStageFigureProps) {
  return (
    <figure
      {...(shown ? {} : ({ inert: "" } as any))}
      aria-hidden={!shown}
      className={cn(
        "body-stage-figure relative m-0 flex flex-col items-center justify-between overflow-hidden bg-black px-[var(--grid-margin)] pb-14 pt-[calc(var(--site-header-height)+4rem)] text-white",
        stacked
          ? "min-h-svh"
          : "absolute inset-0 transition-opacity duration-[600ms] [transition-timing-function:var(--site-ease)]",
        !stacked && (shown ? "opacity-100" : "pointer-events-none opacity-0")
      )}
    >
      <div
        className={cn(
          "absolute inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover",
          !stacked && "transition-transform duration-[1200ms] [transition-timing-function:var(--site-ease)]",
          !stacked && !shown && "scale-105"
        )}
      >
        {body.media}
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent via-40% to-black/60"
        aria-hidden="true"
      />
      <span
        aria-hidden="true"
        className={cn(
          "type-heading pointer-events-none relative whitespace-nowrap text-h1 max-sm:text-h2",
          !stacked && "transition-transform duration-[600ms] [transition-timing-function:var(--site-ease)]",
          !stacked && !shown && "translate-y-10"
        )}
      >
        {body.word}
      </span>
      <figcaption className="relative flex flex-col items-center gap-3 text-center">
        <h3 className="m-0 text-h4">{body.line}</h3>
        <p className="m-0 text-large">
          {body.from} · {body.count}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">{body.actions}</div>
      </figcaption>
    </figure>
  );
}

export interface BodyStageProps {
  label: string;
  bodies: BodyStageItem[];
  className?: string;
}

export function BodyStage({ label, bodies, className = "" }: BodyStageProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const count = bodies.length;

  const onProgress = useCallback(
    (val: number) => {
      const idx = Math.min(count - 1, Math.floor(val * count));
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    },
    [count]
  );

  useStageProgress(containerRef, { smoothing: 1, still: reducedMotion, onProgress });

  if (reducedMotion) {
    return (
      <section data-header="over-media" className={cn("relative bg-black text-white", className)}>
        <h2 className="absolute left-[var(--grid-margin)] top-[calc(var(--site-header-height)+1.5rem)] z-10 m-0 text-meta">
          {label}
        </h2>
        {bodies.map((b) => (
          <BodyStageFigure key={b.id} body={b} shown={true} stacked={true} />
        ))}
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      data-header="over-media"
      className={cn("relative bg-black text-white", className)}
      style={{ height: `${count * 100}svh` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {bodies.map((b, idx) => (
          <BodyStageFigure key={b.id} body={b} shown={idx === activeIndex} stacked={false} />
        ))}
        <h2 className="absolute left-[var(--grid-margin)] top-[calc(var(--site-header-height)+1.5rem)] z-10 m-0 text-meta">
          {label}
        </h2>
      </div>
    </section>
  );
}
