import React from "react";
import { PriceBadge } from "@/components/price-badge";
import { HeroPhotoBanner } from "@/components/photo";

export { PriceBadge, HeroPhotoBanner };

export interface WindowStickerProps {
  price: string;
  line?: string;
  label?: string;
  size?: "card" | "full";
  rows?: Array<{ label: string; value: React.ReactNode }>;
  className?: string;
}

export function WindowSticker(props: WindowStickerProps) {
  return <PriceBadge {...props} />;
}
