import { heroTerminal, profile } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Icon } from "@/components/icons/Icon";

function TerminalPanel() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface/80 shadow-sm backdrop-blur">
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/60" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
        <span className="ml-2 font-mono text-xs text-muted">qaasim — zsh — 80×24</span>
      </div>
      <div className="space-y-3 p-4 font-mono text-[13px] leading-relaxed sm:text-sm">
        {heroTerminal.map((line) => (
          <div key={line.command}>
            <p className="text-muted">
              <span className="text-primary">$</span> {line.command}
            </p>
            <p className="text-text">{line.output}</p>
          </div>
        ))}
        <p className="text-muted">
          <span className="text-primary">$</span>{" "}
          <span className="inline-block h-4 w-2 translate-y-0.5 bg-primary motion-safe:animate-pulse" aria-hidden />
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative scroll-mt-24 pb-20 pt-28 sm:pb-28 sm:pt-36">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal y={10}>
              <p className="font-mono text-sm">
                <span className="text-primary">muhammad@qaasim</span>
                <span className="text-muted">:</span>
                <span className="text-accent">~</span>
                <span className="text-muted">$ ./intro --mobile --web</span>
              </p>
            </Reveal>

            <Stagger as="div" delay={0.1} stagger={0.09}>
              <h1 className="mt-6 font-mono text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {profile.headline.map((line, index) => (
                  <StaggerItem
                    as="span"
                    key={line}
                    className={
                      index === profile.headline.length - 1
                        ? "block text-primary"
                        : "block"
                    }
                  >
                    {line}
                  </StaggerItem>
                ))}
              </h1>
            </Stagger>

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-pretty text-lg text-muted">{profile.tagline}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-mono text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
                >
                  View work
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-mono text-sm text-text transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  Email me
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex items-center gap-4">
                <SocialLinks variant="icons" />
                <span className="font-mono text-xs text-muted">{profile.location}</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={24}>
            <TerminalPanel />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
