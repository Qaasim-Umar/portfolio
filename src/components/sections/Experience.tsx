import { experience, sections } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";

export function Experience() {
  const lastIndex = experience.length - 1;
  return (
    <Section section={sections.experience}>
      <ol>
        {experience.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <li className="grid grid-cols-[auto_1fr] gap-x-5">
              {/* Timeline rail */}
              <div className="relative flex w-3 flex-col items-center">
                <span
                  className={`z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full ring-4 ring-bg ${
                    item.current ? "bg-primary" : "border border-primary bg-bg"
                  }`}
                  aria-hidden
                />
                {index < lastIndex ? (
                  <span className="absolute bottom-0 top-4 w-px bg-border" aria-hidden />
                ) : null}
              </div>

              {/* Entry */}
              <div className={index === lastIndex ? "pb-0" : "pb-16"}>
                <div className="flex flex-col gap-x-3 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-mono text-base font-semibold">
                    {item.role}
                    {item.current ? (
                      <span className="ml-2 align-middle font-mono text-xs text-primary">
                        ● now
                      </span>
                    ) : null}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-muted">{item.period}</span>
                </div>
                <p className="mt-0.5 text-sm text-primary">{item.org}</p>
                <p className="mt-2 max-w-prose text-pretty text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
