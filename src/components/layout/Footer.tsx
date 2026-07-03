import { profile } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/70 py-12">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a href="#top" className="flex items-center gap-1.5 font-mono text-sm font-semibold">
              <span className="text-primary">{">"}</span>
              <span>qaasim</span>
            </a>
            <p className="mt-3 max-w-md text-sm text-muted">
              Built with Next.js, Tailwind, and Framer Motion. No purple-to-pink
              gradients were harmed in the making of this site.
            </p>
            <p className="mt-2 font-mono text-xs text-muted">
              © {year} {profile.name}. All rights reserved, most of them, anyway.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <SocialLinks variant="icons" />
            <a
              href="#top"
              className="font-mono text-xs text-muted transition-colors hover:text-primary"
            >
              back to top ↑
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
