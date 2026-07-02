import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ProjectScreenshot } from "@/lib/content";

/**
 * Phone-framed screenshot strip for a project card. Filters out any entry
 * whose file isn't in /public yet, so a project can declare screenshots
 * before the images are added without breaking the layout.
 */
export function ProjectScreenshots({ screenshots }: { screenshots?: readonly ProjectScreenshot[] }) {
  if (!screenshots?.length) return null;

  const shots = screenshots.filter((shot) =>
    existsSync(path.join(process.cwd(), "public", shot.src.replace(/^\//, ""))),
  );
  if (shots.length === 0) return null;

  return (
    <div className="mt-8 flex gap-4 overflow-x-auto border-t border-border/60 pt-6">
      {shots.map((shot) => (
        <div
          key={shot.src}
          className="relative w-[130px] shrink-0 overflow-hidden rounded-[1.5rem] border-4 border-border/80 bg-bg shadow-sm transition-transform duration-300 ease-out hover:scale-[1.03]"
        >
          <span
            className="absolute left-1/2 top-1.5 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-border/80"
            aria-hidden
          />
          <div className="relative aspect-[9/19.5]">
            <Image src={shot.src} alt={shot.alt} fill sizes="130px" className="object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}
