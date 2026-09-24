import { otherProjects, platforms, sections, type Project, type ProjectLinkType } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Tag } from "@/components/ui/Tag";
import { Icon, type IconKey } from "@/components/icons/Icon";
import { RoleLine } from "@/components/ui/RoleLine";
import { PlatformTabs } from "@/components/ui/PlatformTabs";

const LINK_ICON: Record<ProjectLinkType, IconKey> = {
  play: "play",
  appstore: "apple",
  repo: "github",
  site: "globe",
  case: "arrow",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-surface/40 p-5 transition-colors duration-300 hover:border-primary/50">
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-primary/80">{`// ${project.id}`}</span>
        <span className="text-muted">{project.period}</span>
      </div>

      <h3 className="mt-3 font-mono text-lg font-semibold tracking-tight">{project.name}</h3>
      <p className="mt-1 text-sm text-text">{project.tagline}</p>
      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{project.description}</p>
      <p className="mt-2 font-mono text-xs text-muted">
        <RoleLine role={project.role} orgLabel={project.orgLabel} orgUrl={project.orgUrl} />
      </p>

      {project.metrics.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
          {project.metrics.map((metric) => (
            <li key={metric.label} className="font-mono text-xs">
              <span className="font-semibold text-primary">{metric.value}</span>{" "}
              <span className="text-muted">{metric.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-4">
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
        {project.links.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors duration-200 hover:text-primary"
              >
                <Icon name={LINK_ICON[link.type]} className="h-3.5 w-3.5" />
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function ProjectGrid() {
  const panels = platforms
    .map((platform) => {
      const group = otherProjects.filter((project) => project.platform === platform.key);
      return {
        key: platform.key,
        label: platform.label,
        count: group.length,
        content: (
          <Stagger as="ul" className="grid gap-4 sm:grid-cols-2" stagger={0.06}>
            {group.map((project) => (
              <StaggerItem as="li" key={project.id} className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        ),
      };
    })
    .filter((panel) => panel.count > 0);

  return (
    <Section section={sections.projects}>
      <PlatformTabs panels={panels} label="Projects by platform" />
    </Section>
  );
}
