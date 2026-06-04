import type { ReactNode } from "react";
import { Icon } from "@/components/icons/Icon";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Show a trailing arrow-up-right glyph for outbound links. */
  withIcon?: boolean;
  ariaLabel?: string;
}

/**
 * Anchor that adds safe `target`/`rel` for outbound (http) links and leaves
 * in-page / mailto / tel links untouched.
 */
export function ExternalLink({
  href,
  children,
  className,
  withIcon = false,
  ariaLabel,
}: ExternalLinkProps) {
  const isOutbound = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(isOutbound ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group/link inline-flex items-center gap-1 ${className ?? ""}`}
    >
      {children}
      {withIcon ? (
        <Icon
          name="external"
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
        />
      ) : null}
    </a>
  );
}
