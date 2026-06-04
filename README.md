# Muhammad Qaasim — Portfolio

A personal portfolio for a senior mobile (Flutter) engineer, built in the
**“Terminal Craft”** visual direction: dark-first, mono-forward, asymmetric
left-gutter layout, terminal-green accent, log-style timeline.

- **Framework:** Next.js 16 (App Router) + React 19, TypeScript (strict)
- **Styling:** Tailwind CSS v4 (semantic design tokens, class-based dark mode)
- **Motion:** Framer Motion (scroll-reveal, staggered entrances, `prefers-reduced-motion` aware)
- **Deploy target:** Vercel

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  (Turbopack)
```

Other scripts:

```bash
npm run build    # production build (also type-checks)
npm run start    # serve the production build
npm run lint     # ESLint (flat config)
npx tsc --noEmit # type-check only
```

Requires Node 20.9+.

---

## ✏️ Editing content — one file

**All content lives in [`src/lib/content.ts`](src/lib/content.ts).** The UI only
maps over these typed objects — you should never have to touch JSX to update the
site. Edit the exported objects to change anything:

| Export | Controls |
| --- | --- |
| `profile` | Name, role, hero headline, tagline, bio, email, phone, résumé path |
| `heroTerminal` | The faux shell output in the hero panel |
| `socials` | GitHub / LinkedIn / email / phone links |
| `stats` | The “1M+ users” stat strip |
| `experience` | The timeline entries |
| `education` | The education card |
| `projects` | Every project (set `featured: true` to promote it to Featured Work) |
| `skills` | Grouped skill pills |
| `leadership` | Community / leadership entries |
| `honours` | Awards |
| `sections` | Section titles, ordering indices, nav labels, and the witty intros |
| `site` | SEO title, description, keywords, production URL |

Types are exported alongside the data, so your editor will tell you if a field
is missing or mistyped.

### ⚠️ Placeholders to confirm

A few links are best-guess placeholders (the résumé PDF doesn’t embed plain-text
URLs). Update these in `src/lib/content.ts`:

- `socials` → **GitHub** and **LinkedIn** URLs (currently guessed from the email handle)
- `projects` → **Play Store / repo** URLs for `nahdi`, `white-noise`, `kitaabul-adhkaar`
- Drop your résumé at **`public/resume.pdf`** to make the “Résumé” buttons work
  (or change `profile.resumeUrl`).

---

## 🎨 Swapping the theme — one file

**The entire colour palette is defined as semantic tokens in
[`src/app/globals.css`](src/app/globals.css).** No component uses raw hex.

Change the brand by editing the values in the `:root` (light) and `.dark`
(dark) blocks:

```css
:root {
  --color-bg: #f4f2ec;       /* page background      */
  --color-surface: #fbfaf5;  /* cards / panels       */
  --color-text: #15191a;     /* body text            */
  --color-muted: #5a615b;    /* secondary text       */
  --color-primary: #0b6e40;  /* brand / accent green */
  --color-accent: #97480c;   /* secondary accent     */
  /* …plus surface-2, border, primary-foreground, ring */
}

.dark {
  --color-bg: #0b0e0d;
  --color-primary: #6df0a1;
  /* …dark overrides */
}
```

These are exposed to Tailwind via the `@theme inline` block, so utilities like
`bg-bg`, `text-text`, `text-primary`, and `border-border` resolve to the tokens
and swap automatically between light and dark. Change a token once and it
updates everywhere, in both modes.

**Dark mode** is class-based (`.dark` on `<html>`): an inline script in
[`ThemeScript`](src/components/theme/ThemeScript.tsx) applies the saved or
system theme before first paint (no flash), and
[`ThemeToggle`](src/components/theme/ThemeToggle.tsx) lets the user pin a choice
(persisted to `localStorage`). With no pinned choice, the site follows the OS
preference live.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx            # fonts, metadata, theme script, nav, footer
│  ├─ page.tsx              # composes the sections in order
│  ├─ not-found.tsx         # terminal-style 404
│  ├─ globals.css           # design tokens (THE theme file) + base styles
│  ├─ icon.tsx              # generated favicon
│  ├─ opengraph-image.tsx   # generated OG / Twitter card
│  ├─ sitemap.ts / robots.ts
├─ components/
│  ├─ sections/             # Hero, About, FeaturedProjects, Experience, …
│  ├─ layout/               # Nav, Footer, ScrollProgress, SocialLinks
│  ├─ motion/               # Reveal, Stagger (reduced-motion aware)
│  ├─ theme/                # ThemeScript, ThemeToggle
│  ├─ ui/                   # Section, Container, Tag, ExternalLink
│  ├─ icons/                # single inline-SVG Icon component
│  └─ easter-eggs/          # ConsoleSignature, KonamiEasterEgg
└─ lib/
   ├─ content.ts            # THE content file (single source of truth)
   └─ motion.ts             # shared transitions / variants
```

---

## Accessibility & performance

- Semantic landmarks, one `<h1>`, ordered headings, skip-to-content link.
- WCAG AA contrast in both themes; visible focus rings; keyboard-navigable nav + menu.
- Icon-only controls have `aria-label`s; decorative elements are `aria-hidden`.
- `prefers-reduced-motion` is honoured at the CSS level **and** via Framer’s
  `useReducedMotion()` — animations degrade to simple fades / none.
- Animations are transform/opacity only (GPU-friendly, 60fps).
- Fonts self-hosted via `next/font`; the page is fully static-prerendered.
  There are no raster images (icons are inline SVG; the OG card is generated),
  so there’s nothing to run through `next/image`.

---

## Easter eggs

Two, kept tasteful:

1. Open DevTools → there’s a note in the console.
2. The Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`) does something small.

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it on [Vercel](https://vercel.com/new) — it auto-detects Next.js.
3. Set the environment variable **`NEXT_PUBLIC_SITE_URL`** to your production
   URL (used for canonical links, sitemap, and absolute OG image URLs).
4. Deploy.
