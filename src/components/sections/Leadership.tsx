import { leadership, sections } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function Leadership() {
  return (
    <Section section={sections.community}>
      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2" stagger={0.06}>
        {leadership.map((item) => (
          <StaggerItem
            as="li"
            key={item.id}
            className="rounded-lg border border-border bg-surface/40 p-5"
          >
            <div className="flex flex-col gap-x-3 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-mono text-base font-semibold">{item.role}</h3>
              {item.period ? (
                <span className="shrink-0 font-mono text-xs text-muted">{item.period}</span>
              ) : null}
            </div>
            <p className="mt-0.5 text-sm text-primary">{item.org}</p>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
