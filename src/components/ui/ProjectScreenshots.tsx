import { existsSync } from "node:fs";
import path from "node:path";
import type { ProjectScreenshot } from "@/lib/content";
import { ScreenshotStrip } from "@/components/ui/ScreenshotStrip";

/**
 * Filters a project's screenshots down to files that actually exist in
 * /public, so a project can declare screenshots before the images are added
 * without breaking the layout, then hands off to the interactive strip.
 */
export function ProjectScreenshots({ screenshots }: { screenshots?: readonly ProjectScreenshot[] }) {
  if (!screenshots?.length) return null;

  const shots = screenshots.filter((shot) =>
    existsSync(path.join(process.cwd(), "public", shot.src.replace(/^\//, ""))),
  );
  if (shots.length === 0) return null;

  return <ScreenshotStrip screenshots={shots} />;
}
