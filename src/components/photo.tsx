import React from "react";
import { type MediaEntry } from "@/pages/site/media";
import { cn } from "@/lib/utils";

export interface PhotoProps {
  photo: MediaEntry;
  style?: React.CSSProperties;
  className?: string;
}

export function Photo({ photo, style, className }: PhotoProps) {
  return <img src={photo.src} alt={photo.alt} style={style} className={className} />;
}

export interface HeroPhotoBannerProps {
  photo: MediaEntry;
  title: string;
  line?: string;
  action?: React.ReactNode;
  heading?: "h1" | "h2";
  className?: string;
}

export function HeroPhotoBanner({
  photo,
  title,
  line,
  action,
  heading = "h1",
  className,
}: HeroPhotoBannerProps) {
  const HeadingTag = heading;
  return (
    <div
      data-header="over-media"
      className={cn(
        "relative flex h-[80svh] flex-col justify-end overflow-hidden text-[#f5f1e8] md:h-svh",
        className
      )}
    >
      <div className="absolute inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
        <Photo photo={photo} />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-4 px-[var(--grid-margin)] pb-12 pt-[calc(var(--site-header-height)+2rem)]">
        <HeadingTag className="type-heading m-0 text-h1 max-sm:text-h2 [text-wrap:balance]">
          {title}
        </HeadingTag>
        {line && <p className="m-0 max-w-[48ch] text-large opacity-90">{line}</p>}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}

