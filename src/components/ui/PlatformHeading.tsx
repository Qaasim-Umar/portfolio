/** Mono sub-heading that splits a project list into platform groups, e.g. "// web". */
export function PlatformHeading({ label }: { label: string }) {
  return (
    <h3 className="mb-4 flex items-center gap-3 font-mono text-sm text-primary">
      {label}
      <span className="h-px flex-1 bg-border/70" aria-hidden />
    </h3>
  );
}
