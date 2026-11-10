import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface ActionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  underline?: "always" | "hover" | "never";
  className?: string;
  children: React.ReactNode;
}

export const ActionLink = React.forwardRef<HTMLAnchorElement, ActionLinkProps>(
  ({ href, underline = "always", className, children, ...props }, ref) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const classes = cn(
      "h-auto rounded-none p-0 [font-family:inherit] [font-weight:inherit] text-[length:inherit] text-inherit cursor-pointer",
      "whitespace-normal no-underline hover:no-underline transition-colors",
      underline === "always" && "border-b border-current",
      underline === "hover" && "border-b border-transparent hover:border-current focus-visible:border-current",
      className
    );

    if (isInternal && !href.startsWith("#")) {
      return (
        <Link to={href} className={classes} ref={ref as any} {...(props as any)}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
ActionLink.displayName = "ActionLink";

