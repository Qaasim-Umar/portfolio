import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

/** Small mono pill for stack items, tech tags, and metadata. */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded border border-border bg-surface px-2 py-0.5 font-mono text-xs text-muted ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
