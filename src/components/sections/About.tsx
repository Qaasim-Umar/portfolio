import { education, profile, sections, stats } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Tag } from "@/components/ui/Tag";

export function About() {
  return (
    <Section section={sections.about}>
      <Stagger
        as="ul"
        className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4"
      >
        {stats.map((stat) => (
          <StaggerItem as="li" key={stat.label} className="bg-surface p-5">
            <p className="font-mono text-2xl font-semibold text-primary sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-pretty leading-relaxed text-muted">
            {profile.bio.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "text-text" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-lg border border-border bg-surface/60 p-6">
            <p className="font-mono text-sm text-primary">~/education</p>
            <h3 className="mt-3 font-mono text-lg font-semibold">{education.degree}</h3>
            <p className="mt-1 text-sm text-muted">{education.school}</p>
            <p className="mt-2 font-mono text-xs text-muted">
              {education.period} · {education.grade}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {education.courses.map((course) => (
                <li key={course}>
                  <Tag>{course}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
