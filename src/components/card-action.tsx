import React, { useState, useId, useCallback } from "react";
import { ActionLink } from "@/components/action-link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  dark: "bg-primary text-primary-foreground",
  light: "bg-background text-foreground",
  accent: "bg-accent text-accent-foreground",
  outline: "border border-current bg-transparent text-inherit hover:bg-current/10",
};

export interface CardActionButtonProps {
  href: string;
  tone?: "dark" | "light" | "accent" | "outline";
  className?: string;
  children: React.ReactNode;
}

export function CardActionButton({
  href,
  tone = "dark",
  className,
  children,
}: CardActionButtonProps) {
  return (
    <ActionLink
      href={href}
      className={cn(
        "inline-flex h-14 min-w-[10rem] items-center justify-center whitespace-nowrap rounded-full px-6 text-meta transition-opacity hover:opacity-85",
        tone !== "outline" && "border-0",
        tones[tone],
        className
      )}
    >
      {children}
    </ActionLink>
  );
}

export interface CardActionItem {
  kind: "link" | "modal" | "overlay";
  href?: string;
  title?: string;
  description?: string;
  content?: React.ReactNode;
}

export interface CardActionProps {
  action: CardActionItem;
  label?: string;
  headline?: string;
  className?: string;
}

export function CardAction({
  action,
  label = "Action",
  headline,
  className = "",
}: CardActionProps) {
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const baseClass = cn("card-action rounded-full", className);

  if (action.kind === "link" && action.href) {
    return (
      <Button asChild variant="secondary" size="icon" className={baseClass} aria-label={label}>
        <a href={action.href}>
          <ArrowUpRight className="size-4" />
        </a>
      </Button>
    );
  }

  if (action.kind === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="icon" className={baseClass} aria-label={label}>
            <Plus className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[85svh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{action.title ?? headline}</DialogTitle>
            {action.description && <DialogDescription>{action.description}</DialogDescription>}
          </DialogHeader>
          {action.content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <div className="card-overlay" id={dialogId} data-open={open ? "true" : "false"} hidden={!open}>
        <div className="card-overlay-body">{action.content}</div>
      </div>
      <Button
        variant="secondary"
        size="icon"
        className={baseClass}
        onClick={toggle}
        aria-expanded={open}
        aria-controls={dialogId}
        aria-label={open ? `Close, ${label}` : label}
      >
        {open ? <X className="size-4" /> : <Plus className="size-4" />}
      </Button>
    </>
  );
}
