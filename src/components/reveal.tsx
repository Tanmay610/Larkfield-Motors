import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";

const paces = {
  normal: { easing: "cubic-bezier(0.19, 1, 0.22, 1)", duration: "0.9s", stepMs: 90, risePx: 18 },
  slow: { easing: "var(--site-ease)", duration: "1.2s", stepMs: 300, risePx: 12 },
};

export interface RevealProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  order?: number;
  variant?: "fade" | "rise";
  pace?: "normal" | "slow";
  style?: React.CSSProperties;
}

export function Reveal({
  children,
  as: Component = "div",
  className,
  order = 0,
  variant = "fade",
  pace = "normal",
  style,
}: RevealProps) {
  const domRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [intersected, setIntersected] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const observe = useCallback(() => {
    const el = domRef.current;
    if (!el || prefersReducedMotion) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIntersected(true);
            observerRef.current?.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    observerRef.current.observe(el);
  }, [prefersReducedMotion]);

  useEffect(() => {
    observe();
    return () => observerRef.current?.disconnect();
  }, [observe]);

  if (prefersReducedMotion) {
    return React.createElement(Component, { className, ref: domRef, style }, children);
  }

  const isHidden = !intersected;
  const { easing, duration, stepMs, risePx } = paces[pace];
  const animatedStyle: React.CSSProperties = {
    ...style,
    opacity: isHidden ? 0 : 1,
    transform: variant === "rise" && isHidden ? `translateY(${risePx}px)` : "translateY(0)",
    transitionProperty: "opacity, transform",
    transitionDuration: duration,
    transitionTimingFunction: easing,
    transitionDelay: `${order * stepMs}ms`,
    willChange: "opacity, transform",
  };

  return React.createElement(Component, { className, ref: domRef, style: animatedStyle }, children);
}

export interface WordRevealProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  baseDelayMs?: number;
}

export function WordReveal({
  children,
  as: Component = "span",
  className,
  baseDelayMs = 0,
}: WordRevealProps) {
  const domRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visible, setVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const words = useMemo(() => children.trim().split(/\s+/).filter(Boolean), [children]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const observe = useCallback(() => {
    const el = domRef.current;
    if (!el || prefersReducedMotion) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observerRef.current?.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observerRef.current.observe(el);
  }, [prefersReducedMotion]);

  useEffect(() => {
    observe();
    return () => observerRef.current?.disconnect();
  }, [observe]);

  if (prefersReducedMotion) {
    return React.createElement(Component, { className, ref: domRef }, children);
  }

  const outerStyle: React.CSSProperties = {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "top",
    paddingBottom: "0.12em",
    marginBottom: "-0.12em",
  };

  const getWordStyle = (index: number): React.CSSProperties => ({
    display: "inline-block",
    transform: visible ? "translateY(0)" : "translateY(115%)",
    transitionProperty: "transform",
    transitionDuration: "0.9s",
    transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
    transitionDelay: `${baseDelayMs + index * 20}ms`,
    willChange: "transform",
  });

  const content = words.map((w, idx) => (
    <React.Fragment key={idx}>
      <span style={outerStyle}>
        <span style={getWordStyle(idx)}>{w}</span>
      </span>
      {idx < words.length - 1 ? " " : null}
    </React.Fragment>
  ));

  return React.createElement(Component, { className, ref: domRef }, content);
}

