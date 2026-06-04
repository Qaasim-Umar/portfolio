import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/icons/Icon";

export const metadata: Metadata = {
  title: "404 — route not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[78vh] items-center py-24">
      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-lg border border-border bg-surface/80 shadow-sm">
        <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-muted/60" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
          <span className="ml-2 font-mono text-xs text-muted">qaasim — zsh — error</span>
        </div>

        <div className="space-y-3 p-6 font-mono text-sm leading-relaxed">
          <p className="text-muted">
            <span className="text-primary">$</span> cd ./that-page
          </p>
          <p className="text-text">
            zsh: no such file or directory: <span className="text-accent">that-page</span>
          </p>
          <p className="text-5xl font-semibold tracking-tight text-primary">404</p>
          <p className="text-muted">
            The route you requested never compiled. It happens to the best of us —
            usually right before a demo.
          </p>
          <p className="text-muted">
            <span className="text-primary">$</span> cd ~ <span className="text-muted/70"># let&apos;s get you home</span>
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Icon name="arrow" className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
