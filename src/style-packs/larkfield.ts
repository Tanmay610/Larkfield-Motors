import React from "react";

const googleFontUrl = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&display=swap";

export interface StylePack {
  label: string;
  previewColor: string;
  colors: string[];
  colorTokens: Record<string, string>;
  font: {
    heading: { family: string; url: string | null };
    body: { family: string; url: string | null };
  };
  typeset: {
    name: string;
    category: string;
    basePx: number;
    maxPageWidth: string;
    roles: {
      heading: { family: string; url: string | null; weight: number; lineHeight: string; letterSpacing: string; textTransform: string };
      body: { family: string; url: string | null; weight: number; lineHeight: string; letterSpacing: string; textTransform: string };
      meta: { family: string; url: string | null; weight: number; lineHeight: string; letterSpacing: string; textTransform: string };
    };
    scale: {
      heading1: number;
      heading2: number;
      heading3: number;
      heading4: number;
      largeText: number;
      smallText: number;
    };
  };
  corners?: "round" | "sharp" | "soft";
}

export const larkfieldPack: StylePack = {
  label: "Larkfield",
  previewColor: "#0f1b2d",
  colors: ["#0f1b2d", "#f5f6f8", "#d7f54a", "#dfe5ec"],
  colorTokens: {
    primary: "#0f1b2d",
    primaryForeground: "#f5f6f8",
    background: "#f5f6f8",
    foreground: "#0f1b2d",
    secondary: "#dfe5ec",
    secondaryForeground: "#0f1b2d",
    accent: "#d7f54a",
    accentForeground: "#0f1b2d",
    muted: "#c6d0dc",
    mutedForeground: "color-mix(in srgb, #0f1b2d 65%, transparent)",
    card: "#ffffff",
    cardForeground: "#0f1b2d",
    popover: "#f5f6f8",
    popoverForeground: "#0f1b2d",
    destructive: "oklch(0.577 0.245 27.325)",
    destructiveForeground: "#f5f6f8",
    border: "color-mix(in srgb, #0f1b2d 18%, transparent)",
    input: "color-mix(in srgb, #0f1b2d 30%, transparent)",
    ring: "#0f1b2d",
  },
  font: {
    heading: { family: "Apfel Grotezk", url: null },
    body: { family: "IBM Plex Sans", url: googleFontUrl },
  },
  typeset: {
    name: "apfel-grotezk-ibm-plex-sans",
    category: "sans-serif",
    basePx: 16,
    maxPageWidth: "1440px",
    roles: {
      heading: { family: "Apfel Grotezk", url: null, weight: 500, lineHeight: "1em", letterSpacing: "-0.025em", textTransform: "none" },
      body: { family: "IBM Plex Sans", url: googleFontUrl, weight: 400, lineHeight: "1.5em", letterSpacing: "0em", textTransform: "none" },
      meta: { family: "IBM Plex Sans", url: googleFontUrl, weight: 500, lineHeight: "1.3em", letterSpacing: "0em", textTransform: "none" },
    },
    scale: {
      heading1: 7.5,
      heading2: 4.5,
      heading3: 2.75,
      heading4: 2,
      largeText: 1.5,
      smallText: 0.875,
    },
  },
  corners: "round",
};

export function getStylePackVariables(pack: StylePack): Record<string, string> {
  const { typeset } = pack;
  return {
    "--base-font-size": `${typeset.basePx}px`,
    "--max-page-width": typeset.maxPageWidth,
    "--heading-font-family": typeset.roles.heading.family,
    "--heading-font-weight": String(typeset.roles.heading.weight),
    "--heading-font-line-height": typeset.roles.heading.lineHeight,
    "--heading-font-letter-spacing": typeset.roles.heading.letterSpacing,
    "--heading-font-text-transform": typeset.roles.heading.textTransform,
    "--body-font-family": typeset.roles.body.family,
    "--body-font-weight": String(typeset.roles.body.weight),
    "--body-font-line-height": typeset.roles.body.lineHeight,
    "--body-font-letter-spacing": typeset.roles.body.letterSpacing,
    "--meta-font-family": typeset.roles.meta.family,
    "--meta-font-weight": String(typeset.roles.meta.weight),
    "--meta-font-line-height": typeset.roles.meta.lineHeight,
    "--meta-font-letter-spacing": typeset.roles.meta.letterSpacing,
    "--meta-font-text-transform": typeset.roles.meta.textTransform,
    "--heading-1-size-value": String(typeset.scale.heading1),
    "--heading-2-size-value": String(typeset.scale.heading2),
    "--heading-3-size-value": String(typeset.scale.heading3),
    "--heading-4-size-value": String(typeset.scale.heading4),
    "--large-text-size-value": String(typeset.scale.largeText),
    "--small-text-size-value": String(typeset.scale.smallText),
  };
}

export function applyStylePack(pack: StylePack) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const vars = getStylePackVariables(pack);
  for (const [key, val] of Object.entries(vars)) {
    root.style.setProperty(key, val);
  }
  root.style.setProperty("--font-heading", pack.typeset.roles.heading.family);
  root.style.setProperty("--font-body", pack.typeset.roles.body.family);
  root.style.setProperty("--font-meta", pack.typeset.roles.meta.family);
  root.style.setProperty("--font-heading-weight", String(pack.typeset.roles.heading.weight));
  root.style.setProperty("--font-body-weight", String(pack.typeset.roles.body.weight));

  const cornerRadius = { sharp: "0px", soft: "12px", round: "20px" }[pack.corners ?? "round"];
  if (cornerRadius !== undefined) {
    root.style.setProperty("--radius-card", cornerRadius);
  }

  for (const [key, val] of Object.entries(pack.colorTokens)) {
    const cssKey = key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
    root.style.setProperty(`--color-${cssKey}`, val);
  }

  const urls = Object.values(pack.typeset.roles)
    .map((r) => r.url)
    .filter((u): u is string => !!u);
  for (const url of new Set(urls)) {
    if (document.querySelector(`link[href="${url}"]`)) continue;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }
}

export function StylePackProvider({ children, pack = larkfieldPack }: { children: React.ReactNode; pack?: StylePack }) {
  React.useLayoutEffect(() => {
    applyStylePack(pack);
  }, [pack]);

  return React.createElement(React.Fragment, null, children);
}
