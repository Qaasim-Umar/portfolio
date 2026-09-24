import { sections, skills } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function Skills() {
  return (
    <Section section={sections.skills}>
      <Stagger as="div" className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
        {skills.map((group) => (
          <StaggerItem
            as="div"
            key={group.label}
            className="rounded-lg border border-border bg-surface/40 p-5"
          >
            <h3 className="font-mono text-sm text-primary">{group.label}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="inline-flex items-center rounded border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
