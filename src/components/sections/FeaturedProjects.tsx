import { featuredProjects, platforms, sections, type Project, type ProjectLinkType } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";
import { Icon, type IconKey } from "@/components/icons/Icon";
import { ProjectScreenshots } from "@/components/ui/ProjectScreenshots";
import { RoleLine } from "@/components/ui/RoleLine";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

const LINK_ICON: Record<ProjectLinkType, IconKey> = {
  play: "play",
  appstore: "apple",
  repo: "github",
  site: "globe",
  case: "arrow",
};

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-xl border border-border bg-surface/60 p-6 transition-colors duration-300 hover:border-primary/50 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
            {project.status ? <span className="text-primary">{project.status}</span> : null}
            <span className="text-muted">{project.period}</span>
          </div>
          <h3 className="mt-2 font-mono text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-1 text-lg text-text">{project.tagline}</p>
          <p className="mt-4 max-w-prose text-pretty leading-relaxed text-muted">
            {project.description}
            {project.sourceUrl ? (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1.5 text-xs text-muted/70 underline decoration-dotted underline-offset-2 hover:text-primary"
              >
                (source)
              </a>
            ) : null}
          </p>
          <p className="mt-4 font-mono text-xs text-muted">
            <RoleLine role={project.role} orgLabel={project.orgLabel} orgUrl={project.orgUrl} />
          </p>

          {project.links.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-sm text-text transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  <Icon name={LINK_ICON[link.type]} className="h-4 w-4" />
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-6 border-t border-border/60 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <ul className="flex flex-wrap gap-x-6 gap-y-4">
            {project.metrics.map((metric) => (
              <li key={metric.label}>
                <p className="font-mono text-xl font-semibold text-primary sm:text-2xl">
                  {metric.value}
                </p>
                <p className="mt-0.5 text-xs text-muted">{metric.label}</p>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ProjectScreenshots screenshots={project.screenshots} />
    </article>
  );
}

export function FeaturedProjects() {
  const panels = platforms
    .map((platform) => {
      const group = featuredProjects.filter((project) => project.platform === platform.key);
      return {
        key: platform.key,
        label: platform.label,
        count: group.length,
        content: (
          <div className="flex flex-col gap-6">
            {group.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.08}>
                <FeaturedCard project={project} />
              </Reveal>
            ))}
          </div>
        ),
      };
    })
    .filter((panel) => panel.count > 0);

  return (
    <Section section={sections.work}>
      <PlatformTabs panels={panels} label="Featured work by platform" />
    </Section>
  );
}
