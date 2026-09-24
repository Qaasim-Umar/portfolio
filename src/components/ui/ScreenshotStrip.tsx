"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ProjectScreenshot } from "@/lib/content";
import { Icon } from "@/components/icons/Icon";

function Thumbnail({
  shot,
  onOpen,
}: {
  shot: ProjectScreenshot;
  onOpen: () => void;
}) {
  if (shot.frame === "browser") {
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View screenshot: ${shot.alt}`}
        className="relative w-[300px] shrink-0 cursor-zoom-in overflow-hidden rounded-lg border border-border/80 bg-bg shadow-sm transition-transform duration-300 ease-out hover:scale-[1.02] sm:w-[360px]"
      >
        <BrowserChrome />
        <div className="relative aspect-[16/10]">
          <Image src={shot.src} alt={shot.alt} fill sizes="360px" className="object-cover object-top" />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View screenshot: ${shot.alt}`}
      className="relative w-[130px] shrink-0 cursor-zoom-in overflow-hidden rounded-[1.5rem] border-4 border-border/80 bg-bg shadow-sm transition-transform duration-300 ease-out hover:scale-[1.03]"
    >
      <span
        className="absolute left-1/2 top-1.5 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-border/80"
        aria-hidden
      />
      <div className="relative aspect-[9/19.5]">
        <Image src={shot.src} alt={shot.alt} fill sizes="130px" className="object-cover" />
      </div>
    </button>
  );
}

/** Three-dot title bar shared by browser-framed thumbnails and previews. */
function BrowserChrome() {
  return (
    <div className="flex items-center gap-1.5 border-b border-border/70 bg-surface px-3 py-2" aria-hidden>
      <span className="h-2 w-2 rounded-full bg-accent" />
      <span className="h-2 w-2 rounded-full bg-muted/60" />
      <span className="h-2 w-2 rounded-full bg-primary" />
    </div>
  );
}

/** Phone- or browser-framed screenshot strip; clicking a thumbnail opens a full-size, keyboard-navigable preview. */
export function ScreenshotStrip({ screenshots }: { screenshots: readonly ProjectScreenshot[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + screenshots.length) % screenshots.length)),
    [screenshots.length],
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % screenshots.length)),
    [screenshots.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, showPrev, showNext]);

  return (
    <>
      <div className="mt-8 flex gap-4 overflow-x-auto border-t border-border/60 pt-6">
        {screenshots.map((shot, index) => (
          <Thumbnail key={shot.src} shot={shot} onOpen={() => setOpenIndex(index)} />
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={screenshots[openIndex].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-text transition-colors hover:border-primary hover:text-primary sm:right-8 sm:top-8"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>

            {screenshots.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface text-text transition-colors hover:border-primary hover:text-primary sm:left-6"
                >
                  <Icon name="arrow" className="h-5 w-5 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface text-text transition-colors hover:border-primary hover:text-primary sm:right-6"
                >
                  <Icon name="arrow" className="h-5 w-5" />
                </button>
              </>
            ) : null}

            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.15 }}
              onClick={(event) => event.stopPropagation()}
              className="flex flex-col items-center"
            >
              {screenshots[openIndex].frame === "browser" ? (
                <div className="w-[min(90vw,1100px)] overflow-hidden rounded-xl border border-border/80 bg-bg shadow-2xl">
                  <BrowserChrome />
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={screenshots[openIndex].src}
                      alt={screenshots[openIndex].alt}
                      fill
                      sizes="90vw"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              ) : (
                <div className="relative h-[80vh] max-h-[720px] w-auto overflow-hidden rounded-[2rem] border-8 border-border/80 bg-bg shadow-2xl aspect-[9/19.5]">
                  <span
                    className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-border/80"
                    aria-hidden
                  />
                  <Image
                    src={screenshots[openIndex].src}
                    alt={screenshots[openIndex].alt}
                    fill
                    sizes="90vw"
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              {screenshots.length > 1 ? (
                <p className="mt-4 font-mono text-xs text-muted">
                  {openIndex + 1} / {screenshots.length}
                </p>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
