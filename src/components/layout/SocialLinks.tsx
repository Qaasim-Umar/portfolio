import { socials } from "@/lib/content";
import { Icon } from "@/components/icons/Icon";

interface SocialLinksProps {
  variant?: "icons" | "rows";
  className?: string;
}

/** Renders the contact/social links from content in two layouts. */
export function SocialLinks({ variant = "icons", className }: SocialLinksProps) {
  if (variant === "icons") {
    return (
      <ul className={`flex items-center gap-2 ${className ?? ""}`}>
        {socials.map((social) => (
          <li key={social.name}>
            <a
              href={social.href}
              aria-label={social.label}
              {...(social.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              <Icon name={social.icon} className="h-[18px] w-[18px]" />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex flex-col divide-y divide-border/70 ${className ?? ""}`}>
      {socials.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            {...(social.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group flex items-center justify-between gap-4 py-4 transition-colors duration-200 hover:text-primary"
          >
            <span className="flex items-center gap-3">
              <Icon name={social.icon} className="h-5 w-5 text-muted transition-colors group-hover:text-primary" />
              <span className="font-mono text-sm">{social.label}</span>
            </span>
            <span className="flex items-center gap-2 text-muted transition-colors group-hover:text-primary">
              <span className="hidden font-mono text-sm sm:inline">{social.handle}</span>
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
