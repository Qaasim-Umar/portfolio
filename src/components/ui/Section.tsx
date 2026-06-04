import type { ReactNode } from "react";
import type { SectionMeta } from "@/lib/content";
import { Container } from "./Container";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons/Icon";

interface SectionProps {
  section: SectionMeta;
  children: ReactNode;
  className?: string;
}

/**
 * The repeating section frame: a sticky mono index in the left gutter, then a
 * terminal-prompt kicker, heading, and witty intro. Children render below.
 */
export function Section({ section, children, className }: SectionProps) {
  const titleId = `${section.id}-title`;
  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className={`scroll-mt-24 border-t border-border/70 py-20 sm:py-28 ${className ?? ""}`}
    >
      <Container>
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[5rem_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="font-mono text-xs tracking-widest text-muted">{section.index}</span>
          </div>

          <div>
            <Reveal>
              <header>
                <p className="flex items-center gap-2 font-mono text-sm text-primary">
                  <Icon name="terminal" className="h-4 w-4" />
                  {section.prompt}
                </p>
                <h2
                  id={titleId}
                  className="mt-3 font-mono text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  {section.title}
                </h2>
                <p className="mt-3 max-w-2xl text-pretty text-muted">{section.intro}</p>
              </header>
            </Reveal>

            <div className="mt-10 sm:mt-12">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
