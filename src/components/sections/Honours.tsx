import { honours, sections } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function Honours() {
  return (
    <Section section={sections.honours}>
      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
        {honours.map((honour) => (
          <StaggerItem
            as="li"
            key={honour.id}
            className="rounded-lg border border-border bg-surface/40 p-6"
          >
            <p className="font-mono text-xs text-primary">★ award</p>
            <h3 className="mt-2 font-mono text-lg font-semibold">{honour.title}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
              {honour.detail}
              {honour.href ? (
                <>
                  {" "}
                  <a
                    href={honour.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted/70 underline decoration-dotted underline-offset-2 hover:text-primary"
                  >
                    (source)
                  </a>
                </>
              ) : null}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
