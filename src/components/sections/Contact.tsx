import { profile, sections } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Icon } from "@/components/icons/Icon";

export function Contact() {
  return (
    <Section section={sections.contact}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div>
            <p className="text-pretty text-xl font-medium leading-snug text-text sm:text-2xl">
              Let&apos;s build something that survives contact with real users.
            </p>
            <p className="mt-3 text-muted">
              <span className="font-mono text-primary">●</span> {profile.available} and always
              happy to talk Flutter, Next.js, NOSTR, or why your state management is fine, actually.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-mono text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Icon name="mail" className="h-4 w-4" />
                {profile.email}
              </a>
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-mono text-sm text-text transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                <Icon name="download" className="h-4 w-4" />
                Résumé
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SocialLinks variant="rows" />
        </Reveal>
      </div>
    </Section>
  );
}
