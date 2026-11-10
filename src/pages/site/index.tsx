import React, { useEffect, useLayoutEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { siteConfig } from "./larkfield-motors";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { applyStylePack } from "@/style-packs/larkfield";
import NotFound from "@/pages/NotFound";
import { cn } from "@/lib/utils";

export default function SitePage() {
  const { page, item } = useParams<{ page?: string; item?: string }>();
  const { hash } = useLocation();

  const matched =
    page === undefined
      ? undefined
      : item === undefined
      ? (siteConfig.pages as Record<string, { title: string; content: React.ReactNode }>)[page]
      : (siteConfig.items as Record<string, (id: string) => { title: string; content: React.ReactNode } | undefined>)[page]?.(item);

  useLayoutEffect(() => {
    applyStylePack(siteConfig.pack);
  }, []);

  useLayoutEffect(() => {
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    window.scrollTo(0, el ? el.getBoundingClientRect().top + window.scrollY : 0);
  }, [hash, page, item]);

  useEffect(() => {
    document.title = matched
      ? `${matched.title} · ${siteConfig.header.name}`
      : "Larkfield Motors — Used cars, service and test drives";
  }, [matched]);

  if (page !== undefined && !matched) {
    return <NotFound />;
  }

  return (
    <div
      className={cn(
        "themed-type site-template min-h-screen bg-background text-foreground",
        "site-template-larkfield-motors",
        `layout-${siteConfig.layout}`
      )}
    >
      <SiteHeader overlay={true} {...siteConfig.header} />
      <main>{matched ? matched.content : <>{siteConfig.hero}{siteConfig.after}</>}</main>
      <SiteFooter {...siteConfig.footer} />
    </div>
  );
}
