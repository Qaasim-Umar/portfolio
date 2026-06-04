import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { portrait } from "@/lib/content";

/**
 * Terminal-framed portrait for the About section. Renders only when the image
 * actually exists in /public (checked at build/render time), so the layout
 * stays clean — and the photo appears automatically once the file is added.
 */
export function Portrait() {
  const file = path.join(process.cwd(), "public", portrait.src.replace(/^\//, ""));
  if (!existsSync(file)) return null;

  return (
    <figure className="group overflow-hidden rounded-lg border border-border bg-surface/60">
      <figcaption className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/60" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
        <span className="ml-2 font-mono text-xs text-muted">{portrait.title}</span>
      </figcaption>

      <div className="relative aspect-square">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 320px"
          className="object-cover object-center grayscale transition duration-500 ease-out group-hover:grayscale-0 motion-safe:group-hover:scale-[1.02]"
        />
      </div>

      {portrait.caption ? (
        <figcaption className="border-t border-border/70 px-4 py-2.5 font-mono text-xs text-muted">
          {portrait.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
