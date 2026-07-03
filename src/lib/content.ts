/**
 * ============================================================================
 *  SINGLE SOURCE OF TRUTH
 * ============================================================================
 *  Every word, link, date, and metric the site renders lives in this file.
 *  The UI only maps over these typed objects — it never hard-codes content.
 *  To update the site, edit here. You should never need to touch JSX.
 *
 *  To re-brand the colours, see `src/app/globals.css` (the @theme token block).
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type IconName =
  | "github"
  | "linkedin"
  | "mail"
  | "phone"
  | "external"
  | "arrow"
  | "download"
  | "globe"
  | "x";

export interface SocialLink {
  /** Stable key, used for React keys + icon lookup. */
  readonly name: string;
  /** Accessible label, e.g. "GitHub". */
  readonly label: string;
  /** Fully-qualified href (mailto:/tel:/https:). */
  readonly href: string;
  /** Short display handle, e.g. "@qaasim405". */
  readonly handle: string;
  readonly icon: IconName;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export interface SectionMeta {
  /** Two-digit index shown in the mono gutter, e.g. "01". */
  readonly index: string;
  /** DOM id + scroll anchor. */
  readonly id: string;
  /** Whether it appears in the primary nav. */
  readonly nav: boolean;
  /** Human label for nav + heading. */
  readonly title: string;
  /** Mono "prompt" shown above the heading, e.g. "~/experience". */
  readonly prompt: string;
  /** One-line, witty-but-professional section intro. */
  readonly intro: string;
}

export interface Profile {
  readonly name: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;
  readonly roleShort: string;
  readonly location: string;
  readonly available: string;
  readonly email: string;
  /** Drop your résumé at `public/resume.pdf` to enable the download button. */
  readonly resumeUrl: string;
  /** Hero headline lines — rendered with the accent word emphasised. */
  readonly headline: readonly string[];
  /** Short hero sub-line with a wink. */
  readonly tagline: string;
  /** Longer About narrative; each entry is a paragraph. */
  readonly bio: readonly string[];
}

export interface PortraitInfo {
  /** Path under /public, e.g. "/qaasim.jpg". */
  readonly src: string;
  readonly alt: string;
  /** Mono window title shown in the frame chrome, e.g. "~/qaasim.jpg". */
  readonly title: string;
  /** Optional mono caption shown beneath the photo. */
  readonly caption?: string;
}

export interface ExperienceItem {
  readonly id: string;
  readonly role: string;
  readonly org: string;
  readonly orgUrl?: string;
  /** Substring of `org` to hyperlink; defaults to the whole `org` string when omitted. */
  readonly orgLabel?: string;
  /** Small parenthetical aside after the org name, e.g. "(now Aegeantic)", with its own link. */
  readonly orgNote?: { readonly label: string; readonly href: string };
  readonly period: string;
  readonly location?: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly current?: boolean;
}

export interface Education {
  readonly degree: string;
  readonly school: string;
  readonly period: string;
  readonly grade: string;
  readonly courses: readonly string[];
}

export type ProjectLinkType = "play" | "appstore" | "repo" | "site" | "case";

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
  readonly type: ProjectLinkType;
}

export interface ProjectMetric {
  readonly value: string;
  readonly label: string;
}

export interface ProjectScreenshot {
  /** Path under /public, e.g. "/projects/nahdi/home.jpg". */
  readonly src: string;
  readonly alt: string;
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly role: string;
  readonly period: string;
  readonly status?: string;
  readonly featured: boolean;
  readonly metrics: readonly ProjectMetric[];
  readonly stack: readonly string[];
  readonly links: readonly ProjectLink[];
  /** Optional phone screenshots; the frame is hidden until the files exist in /public. */
  readonly screenshots?: readonly ProjectScreenshot[];
  /** Substring of `role` to render as a hyperlink (e.g. the org/company name). Pairs with `orgUrl`. */
  readonly orgLabel?: string;
  readonly orgUrl?: string;
  /** Subtle citation link appended after `description`, e.g. a press mention. */
  readonly sourceUrl?: string;
}

export interface SkillItem {
  readonly name: string;
  /** Optional experience note, e.g. "5y+". */
  readonly note?: string;
}

export interface SkillGroup {
  readonly label: string;
  readonly items: readonly SkillItem[];
}

export interface LeadershipItem {
  readonly id: string;
  readonly role: string;
  readonly org: string;
  readonly period?: string;
  readonly description: string;
}

export interface Honour {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  /** Optional link to the source (press mention, LinkedIn post, etc). */
  readonly href?: string;
}

export interface TerminalLine {
  readonly command: string;
  readonly output: string;
}

export interface SiteConfig {
  /** Production URL — override with NEXT_PUBLIC_SITE_URL on Vercel. */
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly locale: string;
  readonly ogImageAlt: string;
}

/* -------------------------------------------------------------------------- */
/*  Site configuration                                                         */
/* -------------------------------------------------------------------------- */

export const site: SiteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://quwaysim.vercel.app",
  title: "Muhammad Qaasim · Senior Mobile Software Engineer (Flutter)",
  description:
    "Senior mobile software engineer specialising in Flutter. I build pixel-perfect apps for 1M+ users and decentralized, privacy-first messaging over NOSTR.",
  keywords: [
    "Muhammad Qaasim",
    "Flutter developer",
    "Mobile software engineer",
    "Dart",
    "NOSTR",
    "Rust",
    "Riverpod",
    "Clean Architecture",
  ],
  locale: "en_US",
  ogImageAlt: "Muhammad Qaasim · Senior Mobile Software Engineer (Flutter)",
};

/* -------------------------------------------------------------------------- */
/*  Profile                                                                    */
/* -------------------------------------------------------------------------- */

export const profile: Profile = {
  name: "Muhammad Qaasim",
  firstName: "Muhammad",
  lastName: "Qaasim",
  role: "Senior Mobile Software Engineer (Flutter)",
  roleShort: "Senior Flutter Engineer",
  location: "Building for everywhere",
  available: "Open to senior mobile roles",
  email: "qaasim405@gmail.com",
  resumeUrl: "/resume.pdf",
  headline: ["I build mobile apps", "that ship to millions", "and never miss a frame."],
  tagline:
    "Flutter from pixel to protocol, from a CMS-driven app with 1M+ users to decentralized, privacy-first messaging over NOSTR.",
  bio: [
    "I'm a senior mobile engineer who has spent 4+ years turning Flutter into production software people actually keep on their home screen. Most recently I co-built Nahdi, a highly dynamic, localised commerce app serving over a million users, and contributed to White Noise, a decentralized, privacy-first messenger built on NOSTR with a Rust MLS crate doing the cryptographic heavy lifting.",
    "I care about the unglamorous parts: clean architecture, offline-first behaviour, pixel-perfect localisation, and state management that a teammate can read at 2am without crying. Stacked, Riverpod, MVVM, Clean Architecture, I've shipped them all, and I have opinions about when each one earns its keep.",
    "Computer Engineering grad from FUT Minna. Somewhere along the way I led Android communities, ran bootcamps that grew a campus dev scene from almost nothing to 300+, and never quite kicked the open-source habit.",
  ],
};

/**
 * About-section portrait. Save the image at `public/qaasim.jpg` to show it —
 * the slot stays hidden until that file exists, so nothing breaks meanwhile.
 */
export const portrait: PortraitInfo = {
  src: "/qaasim.jpg",
  alt: "Muhammad Qaasim, smiling, at the Africa Bitcoin Conference",
  title: "~/qaasim.jpg",
  caption: "// Africa Bitcoin Conference — talking NOSTR, mostly",
};

/** Faux shell output rendered in the hero's terminal panel. */
export const heroTerminal: readonly TerminalLine[] = [
  { command: "whoami", output: "muhammad qaasim, senior flutter engineer" },
  { command: "cat stack.txt", output: "flutter · dart · riverpod · rust · nostr" },
  { command: "uptime", output: "4+ yrs shipping mobile · 1M+ users reached" },
  { command: "echo $STATUS", output: "open to senior mobile roles" },
];

/* -------------------------------------------------------------------------- */
/*  Social / contact links                                                     */
/* -------------------------------------------------------------------------- */

export const socials: readonly SocialLink[] = [
  {
    name: "github",
    label: "GitHub",
    href: "https://github.com/quwaysim",
    handle: "@quwaysim",
    icon: "github",
  },
  {
    name: "x",
    label: "X",
    href: "https://x.com/quwaysim",
    handle: "@quwaysim",
    icon: "x",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/quwaysim",
    handle: "quwaysim",
    icon: "linkedin",
  },
  {
    name: "email",
    label: "Email",
    href: "mailto:qaasim405@gmail.com",
    handle: "qaasim405@gmail.com",
    icon: "mail",
  },
];

/* -------------------------------------------------------------------------- */
/*  Stats (About strip)                                                        */
/* -------------------------------------------------------------------------- */

export const stats: readonly Stat[] = [
  { value: "4+ yrs", label: "shipping mobile" },
  { value: "1M+", label: "users reached" },
  { value: "10+", label: "products shipped" },
  { value: "300+", label: "devs mentored" },
];

/* -------------------------------------------------------------------------- */
/*  Experience (timeline, reverse-chronological)                               */
/* -------------------------------------------------------------------------- */

export const experience: readonly ExperienceItem[] = [
  {
    id: "teesas",
    role: "Software Engineer",
    org: "Teesas",
    orgUrl: "https://teesas.com/",
    period: "Jan 2026 - Present",
    summary:
      "Building educational mobile apps for Teesas, including Teesas Education, a gamified learning app for Nigerian students preparing for JAMB, WAEC, and NECO.",
    tags: ["Flutter", "Dart", "MobX", "Clean Architecture"],
    current: true,
  },
  {
    id: "ipf",
    role: "Software Engineer",
    org: "Internet Privacy Foundation",
    orgUrl: "https://ipf.dev/",
    orgNote: { label: "formerly Parres", href: "https://parres.org" },
    period: "May 2025 - Dec 2025",
    summary:
      "Contributed to White Noise (Marmot Protocol): a decentralized, privacy-first messenger in Flutter/Dart, integrating a Rust MLS crate for end-to-end group messaging over NOSTR.",
    tags: ["Flutter", "Dart", "Rust", "NOSTR", "MLS", "E2E"],
  },
  {
    id: "featuremind",
    role: "Software Engineer",
    org: "Feature/mind",
    orgUrl: "https://featuremind.com",
    orgNote: { label: "now Aegeantic", href: "https://aegeantic.com" },
    period: "Dec 2023 - Jul 2025",
    summary:
      "Co-built Nahdi, a pixel-perfect, fully localised commerce app serving 1M+ users. Contentful CMS, Algolia search, Dynamic Yield personalisation, Hive storage, Riverpod + Clean Architecture.",
    tags: ["Flutter", "Riverpod", "Clean Architecture", "Contentful", "Algolia", "Hive"],
  },
  {
    id: "oss",
    role: "Open Source Contributor",
    org: "Marmot Protocol & friends",
    orgLabel: "Marmot Protocol",
    orgUrl: "https://github.com/marmot-protocol",
    period: "May 2025 - Present",
    summary:
      "Ongoing contributions to open, privacy-respecting software, most notably the Marmot Protocol / White Noise ecosystem.",
    tags: ["Open Source", "NOSTR"],
    current: true,
  },
  {
    id: "hoteltravel",
    role: "Flutter Developer",
    org: "Hotel Travel Inc",
    orgUrl: "https://hotels.ng/",
    period: "Mar 2022 - Dec 2023",
    summary:
      "Built multi-form-factor, offline-first Flutter products including Cash Register by Timbu, accurate transactions, payments, and professional receipts. SQLite, Stacked, MVVM.",
    tags: ["Flutter", "SQLite", "Stacked", "MVVM", "Offline-first"],
  },
  {
    id: "zurichat-oss",
    role: "Open-code Contributor",
    org: "Zuri Chat",
    orgUrl: "https://hng.tech/",
    period: "Dec 2022 - Dec 2023",
    summary:
      "Continued contributing to the Zuri Chat mobile codebase alongside the WorkshopApps community after the internship wrapped.",
    tags: ["Flutter", "Open Source"],
  },
  {
    id: "hng",
    role: "Software Engineer · HNGi8",
    org: "Zuri Chat",
    orgUrl: "https://hng.tech/",
    period: "Aug 2021 - Oct 2021",
    summary:
      "Flutter Developer Track Finalist at the HNGi8 remote internship. Repo maintainer during the program and Flutter mobile team lead post-internship. Stacked + MVVM.",
    tags: ["Flutter", "Stacked", "MVVM", "Team Lead"],
  },
  {
    id: "alhikmah",
    role: "IT Support Intern",
    org: "Al-Hikmah University Ilorin · ICT Centre",
    orgUrl: "https://alhikmahuniversity.edu.ng/",
    period: "Jun 2021 - Sep 2021",
    summary:
      "Kept the university's ICT centre running; hardware, networks, and the occasional miracle for a stubborn printer.",
    tags: ["IT Support", "Networking"],
  },
  {
    id: "swep",
    role: "Student Work Experience (SWEP)",
    org: "Federal University of Technology, Minna",
    orgUrl: "https://futminna.edu.ng/",
    period: "Sep 2018 - Oct 2018",
    summary:
      "Where it started: an awarded engineering work placement across multiple departments. Recognised for standout contribution among 400+ students.",
    tags: ["Engineering", "Hardware"],
  },
];

export const education: Education = {
  degree: "B.Eng, Computer Engineering",
  school: "Federal University of Technology, Minna",
  period: "Graduated June 2023",
  grade: "4.02 / 5.0 CGPA",
  courses: [
    "Software Engineering I & II",
    "Data Structures & Algorithms",
    "Programming Languages (C, C++)",
    "Study of Programming Languages (Java)",
  ],
};

/* -------------------------------------------------------------------------- */
/*  Projects (featured + grid live in one list, derived below)                 */
/* -------------------------------------------------------------------------- */

export const projects: readonly Project[] = [
  {
    id: "biuda",
    name: "Biuda",
    tagline: "Making tech skills fun for kids.",
    description:
      "Built a mobile EdTech app that teaches children and teenagers tech skills through live classes, self-paced lessons, and hands-on projects spanning coding, design, Python, AI, and game development. Gamified progress and an AI-personalised learning path keep young learners engaged.",
    role: "Solo Project · Biuda",
    orgLabel: "Biuda",
    orgUrl: "https://biudahq.com/",
    period: "2025",
    featured: false,
    metrics: [],
    stack: ["Flutter", "Dart", "Riverpod", "Clean Architecture"],
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.biudahq.mobile.app", type: "play" },
    ],
  },
  {
    id: "nahdi",
    name: "Nahdi",
    tagline: "A localised commerce app for 1M+ people.",
    description:
      "Co-built a highly dynamic, pixel-perfect and fully localised application powered by the Contentful CMS. Algolia drives search, Dynamic Yield handles personalisation, BazaarVoice powers ratings and reviews, Hive backs local storage, and Riverpod + Clean Architecture keep a large surface area maintainable. Today it connects 1,100+ pharmacies to 1M+ active users across the Middle East.",
    role: "Team Project · Feature/mind",
    orgLabel: "Feature/mind",
    orgUrl: "https://featuremind.com",
    sourceUrl:
      "https://www.linkedin.com/posts/girgingokhan_we-are-excited-to-share-that-featuremind-activity-7315376470405660672-jVh9?utm_source=share&utm_medium=member_desktop&rcm=ACoAACqxAE0BK5BCZRingVlhbHNtfRTwLfRhLEw",
    period: "Dec 2023 - Jun 2025",
    status: "Live · in maintenance",
    featured: true,
    metrics: [
      { value: "1M+", label: "users" },
      { value: "5M+", label: "downloads" },
      { value: "4.6★", label: "Play Store" },
      { value: "Clean", label: "architecture" },
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Contentful", "Algolia", "Dynamic Yield", "BazaarVoice", "Hive"],
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.nahdi.main&hl=en", type: "play" },
      { label: "App Store", href: "https://apps.apple.com/us/app/%D8%A7%D9%84%D9%86%D9%87%D8%AF%D9%8A-nahdi/id868704084", type: "appstore" },
    ],
    screenshots: [
      { src: "/projects/nahdi/splash.jpg", alt: "Nahdi app splash screen" },
      { src: "/projects/nahdi/home.jpg", alt: "Nahdi app home screen with sun care promotions and category shortcuts" },
      { src: "/projects/nahdi/search-results.jpg", alt: "Nahdi search results for Omega 3 supplements" },
      { src: "/projects/nahdi/product-detail.jpg", alt: "Nahdi product detail page for a CeraVe cleanser" },
    ],
  },
  {
    id: "white-noise",
    name: "White Noise",
    tagline: "Decentralized, privacy-first messaging over NOSTR.",
    description:
      "Contributed to a powerful, decentralized, privacy-first messaging app powered by Flutter/Dart with a Rust MLS crate integration over NOSTR; end-to-end encrypted group messaging that doesn't trust a central server.",
    role: "Open Source · Internet Privacy Foundation",
    orgLabel: "Internet Privacy Foundation",
    orgUrl: "https://ipf.dev/",
    period: "May 2025 - Dec 2025",
    status: "Marmot Protocol",
    featured: true,
    metrics: [
      { value: "NOSTR", label: "transport" },
      { value: "Rust MLS", label: "crypto core" },
      { value: "E2E", label: "by default" },
    ],
    stack: ["Flutter", "Dart", "Rust", "NOSTR", "MLS", "Cryptography"],
    links: [{ label: "Marmot Protocol", href: "https://github.com/marmot-protocol/whitenoise-archive/releases", type: "repo" }],
    screenshots: [
      { src: "/projects/white-noise/splash.jpg", alt: "White Noise splash screen with login and sign up" },
      { src: "/projects/white-noise/profile-ready.jpg", alt: "White Noise profile ready screen prompting the user to search for friends" },
      { src: "/projects/white-noise/chat.jpg", alt: "White Noise chat conversation screen" },
      { src: "/projects/white-noise/settings.jpg", alt: "White Noise settings screen showing profile keys and network relays" },
    ],
  },
  {
    id: "teesas-education",
    name: "Teesas Education",
    tagline: "Gamified learning for Nigerian students, JAMB to JSS.",
    description:
      "Co-built an all-in-one learning app covering Grades 1-6 through JSS1-SS3, with video lessons from top teachers, live tutoring, and exam prep for JAMB, WAEC, and NECO. Lessons are delivered in English and local languages like Yoruba, Igbo, and Hausa, wrapped in a gamified, interactive experience.",
    role: "Team Project · Teesas",
    orgLabel: "Teesas",
    orgUrl: "https://teesas.com/",
    period: "2026",
    featured: true,
    metrics: [{ value: "100k+", label: "downloads" }],
    stack: ["Flutter", "Dart", "MobX", "Clean Architecture"],
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=app.teesas", type: "play" },
      { label: "App Store", href: "https://apps.apple.com/us/app/teesas-education-learn/id1595847520", type: "appstore" },
    ],
    screenshots: [
      { src: "/projects/teesas-education/splash.jpg", alt: "Teesas Education app splash screen" },
      { src: "/projects/teesas-education/home.jpg", alt: "Teesas Education home screen with video tutorials and assessments for UTME (JAMB)" },
      { src: "/projects/teesas-education/lesson.jpg", alt: "Teesas Education video lesson screen on Soil and Soil Conservation" },
    ],
  },
  {
    id: "hotels-ng",
    name: "Hotels.ng",
    tagline: "Book hotels across Nigeria, without the hassle.",
    description:
      "Co-built the booking app for Nigeria's leading hotel marketplace: search 10,000+ hotels across 1,000+ cities, filter by budget, and book, cancel, or extend a stay in a few taps.",
    role: "Team Project · Hotels NG",
    orgLabel: "Hotels NG",
    orgUrl: "https://hotels.ng/",
    period: "2022 - 2023",
    featured: false,
    metrics: [{ value: "10k+", label: "downloads" }],
    stack: ["Flutter", "ChangeNotifier", "Provider"],
    links: [{ label: "Play Store", href: "https://play.google.com/store/apps/details?id=ng.hotels.booking.app", type: "play" }],
  },
  {
    id: "cash-register",
    name: "Cash Register by Timbu",
    tagline: "Offline-first point of sale with proper receipts.",
    description:
      "Co-built a multi-form-factor, flavoured, offline-first app that helps individuals and businesses record transactions accurately, handle payments, and generate professional receipts. SQLite for storage, Stacked + MVVM.",
    role: "Team Project · Hotels NG",
    orgLabel: "Hotels NG",
    orgUrl: "https://hotels.ng/",
    period: "2023",
    featured: false,
    metrics: [],
    stack: ["Flutter", "SQLite", "Stacked", "MVVM", "Offline-first"],
    links: [],
  },
  {
    id: "digibot",
    name: "DigiBot",
    tagline: "Remote monitoring & control for a weed-killing robot.",
    description:
      "Final-year project: a Flutter app to remotely monitor and control a weeding robot, with Firebase as the backend. Built with Stacked + MVVM.",
    role: "Final Year Project · Federal University of Technology, Minna",
    orgLabel: "Federal University of Technology, Minna",
    orgUrl: "https://futminna.edu.ng/",
    period: "Dec 2022 - Jun 2023",
    featured: false,
    metrics: [],
    stack: ["Flutter", "Firebase", "Stacked", "MVVM", "IoT"],
    links: [],
  },
  {
    id: "trackhub",
    name: "TrackHub Rider App",
    tagline: "Pick-up and delivery logistics, on demand.",
    description:
      "A logistics service app that helps users pick up or deliver items to the destination of their choice. Built under contract with Stacked + MVVM.",
    role: "Contract",
    period: "Dec 2021 - Feb 2022",
    featured: false,
    metrics: [],
    stack: ["Flutter", "Stacked", "MVVM"],
    links: [],
  },
  {
    id: "zuri-chat",
    name: "Zuri Chat",
    tagline: "Business communication without the chaos.",
    description:
      "A modern business communication platform that brings workspace collaboration into a single app. Built with my HNGi8 team in Flutter (Stacked + MVVM). I was a repo maintainer during the internship and the Flutter mobile team lead afterwards.",
    role: "Group Project · HNGi8 Remote Internship",
    orgLabel: "HNGi8 Remote Internship",
    orgUrl: "https://hng.tech/",
    period: "Aug 2021 - Oct 2021",
    featured: false,
    metrics: [],
    stack: ["Flutter", "Stacked", "MVVM"],
    links: [],
  },
  {
    id: "learnhub",
    name: "LearnHub",
    tagline: "Course resources & quizzes for classrooms.",
    description:
      "An education-focused Android app letting teachers upload course resources, set quizzes, and more. Built in Java with Firebase for the Team-Educatey project (Google Africa Developer Scholarship 2020).",
    role: "Group Project · GADS 2020",
    period: "Oct 2020",
    featured: false,
    metrics: [],
    stack: ["Java", "Android", "Firebase"],
    links: [],
  },
  {
    id: "kitaabul-adhkaar",
    name: "Kitaabul-Adhkaar",
    tagline: "Islamic supplications, beautifully indexed.",
    description:
      "A personal Android app of Islamic supplications built for a school. Quietly beloved on the Play Store with a 4.9★ rating.",
    role: "Contract",
    period: "Jul 2020",
    featured: false,
    metrics: [
      { value: "4.9★", label: "Play Store" },
      { value: "100+", label: "installs" },
    ],
    stack: ["Java", "Android"],
    // TODO: add the real Play Store URL.
    links: [{ label: "Play Store", href: "https://play.google.com/store", type: "play" }],
  },
  {
    id: "al-maathuraat",
    name: "Al-Maathuraat",
    tagline: "Morning and evening supplications, simplified.",
    description:
      "A personal Android app that makes the daily morning and evening supplications (al-Ma'thurat) easier to keep up with. The Ma'thurat section is fully transliterated, with a built-in counter and 50 authentic supplications from the Prophet ﷺ.",
    role: "Personal Project",
    period: "2020",
    featured: false,
    metrics: [
      { value: "5.0★", label: "Play Store" },
      { value: "500+", label: "downloads" },
    ],
    stack: ["Java", "Android", "MVVM"],
    links: [{ label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.quwaysim.maathuraat", type: "play" }],
  },
  {
    id: "regapp",
    name: "RegApp",
    tagline: "Killed a paper ledger. Permanently.",
    description:
      "An Android app for an annual camping programme's participant registration. It replaced years of paper record-keeping and financial mismanagement, and was fully adopted by the organisers. Java + Firebase.",
    role: "Personal Project",
    period: "Dec 2019",
    featured: false,
    metrics: [{ value: "Adopted", label: "in production" }],
    stack: ["Java", "Android", "Firebase"],
    links: [],
  },
  {
    id: "airtel-mifi",
    name: "Airtel MiFi",
    tagline: "Manage your MiFi without a browser tab.",
    description:
      "A fun project: a mobile app for Airtel MiFi devices so users can manage their hardware without opening a browser every time.",
    role: "Group Project · For fun",
    period: "Nov 2019",
    featured: false,
    metrics: [],
    stack: ["Flutter"],
    links: [],
  },
];

/** Featured highlights (Nahdi + White Noise + Teesas Education). */
export const featuredProjects: readonly Project[] = projects.filter((p) => p.featured);
/** Everything else, for the full grid. */
export const otherProjects: readonly Project[] = projects.filter((p) => !p.featured);

/* -------------------------------------------------------------------------- */
/*  Skills                                                                     */
/* -------------------------------------------------------------------------- */

export const skills: readonly SkillGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "Dart", note: "4y+" },
      { name: "Java", note: "2y" },
      { name: "Kotlin", note: "<1y" },
      { name: "Rust", note: "<1y" },
      { name: "C / C++" },
    ],
  },
  {
    label: "Mobile & Flutter",
    items: [
      { name: "Flutter", note: "4y+" },
      { name: "Android Studio", note: "5y+" },
      { name: "Rust FFI", note: "<1y" },
      { name: "Responsive / multi form-factor" },
      { name: "Offline-first" },
      { name: "Localisation" },
      { name: "Theming" },
      { name: "Widget/Unit Testing" },
    ],
  },
  {
    label: "State & Architecture",
    items: [
      { name: "Stacked", note: "2y" },
      { name: "Riverpod", note: "2y+" },
      { name: "MVVM" },
      { name: "Clean Architecture" },
    ],
  },
  {
    label: "Backend & Services",
    items: [
      { name: "Firebase", note: "2y+" },
      { name: "Supabase", note: "1y" },
      { name: "Contentful CMS", note: "1y" },
      { name: "Algolia", note: "1y" },
      { name: "Dynamic Yield" },
      { name: "BazaarVoice" },
      { name: "SQLite", note: "2y" },
      { name: "Hive" },
      { name: "Push Notifications (FCM)" },
    ],
  },
  {
    label: "Tooling & Platforms",
    items: [
      { name: "Git", note: "4y+" },
      { name: "VS Code", note: "5y+" },
      { name: "PlayStore", note: "3y+" },
      { name: "AppStore", note: "1y" },
      { name: "Codemagic" },
      { name: "Performance Profiling" },
    ],
  },
  {
    label: "Protocols & Freedom Tech",
    items: [
      { name: "NOSTR", note: "<1y" },
      { name: "Marmot", note: "<1y" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Leadership & community                                                     */
/* -------------------------------------------------------------------------- */

export const leadership: readonly LeadershipItem[] = [
  {
    id: "gdsc",
    role: "Android Lead",
    org: "Google Developer Student Clubs · FUT Minna",
    period: "2019 - 2021",
    description:
      "Core team for the school's first-ever GDSC chapter, two consecutive terms. Led the Android track.",
  },
  {
    id: "i4g",
    role: "Android Lead",
    org: "Ingressive for Good · FUT Minna",
    period: "2020 - 2021",
    description:
      "Core team for the first-ever I4G chapter on campus, leading Android.",
  },
  {
    id: "bootcamps",
    role: "Bootcamp Facilitator",
    org: "GDSC (Android) & I4G (Flutter)",
    description:
      "Ran bootcamps that grew campus Android devs from almost nothing to 30+, and the wider on-campus dev community to 300+ strong.",
  },
  {
    id: "futmx",
    role: "Core Team Member",
    org: "FUTMx Dev Circle",
    description: "Helped steer one of the campus's developer circles.",
  },
  {
    id: "gdg",
    role: "Active Member",
    org: "GDG Minna · GDG Ilorin",
    description: "Regular at the local Google Developer Group communities.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Honours & awards                                                           */
/* -------------------------------------------------------------------------- */

export const honours: readonly Honour[] = [
  {
    id: "hng",
    title: "HNGi8 Finalist",
    detail:
      "One of ~300 finalists from the 12,000 interns who started HNG Internship 8 Flutter Developer Track.",
  },
  {
    id: "swep",
    title: "SWEP Award",
    detail:
      "Recognised for outstanding contribution across 4 departments and 400+ students in the Student Work Experience Program (2018).",
  },
  {
    id: "featuremind-shoutout",
    title: "Featured by Feature/mind",
    detail: "Called out in Feature/mind's LinkedIn announcement celebrating the Nahdi launch.",
    href: "https://www.linkedin.com/posts/girgingokhan_we-are-excited-to-share-that-featuremind-activity-7315376470405660672-jVh9?utm_source=share&utm_medium=member_desktop&rcm=ACoAACqxAE0BK5BCZRingVlhbHNtfRTwLfRhLEw",
  },
  {
    id: "biuda-launch-mention",
    title: "Featured in Biuda's launch celebration",
    detail: "Called out in Patrick Chukwu's LinkedIn post celebrating Biuda's product launch.",
    href: "https://www.linkedin.com/posts/patrick-chukwu_biuda-productlaunch-startupjourney-activity-7440428316257591296-_2ob?utm_source=share&utm_medium=member_desktop&rcm=ACoAACqxAE0BK5BCZRingVlhbHNtfRTwLfRhLEw",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section metadata (copy + order + nav)                                      */
/* -------------------------------------------------------------------------- */

export const sections = {
  about: {
    index: "01",
    id: "about",
    nav: true,
    title: "About",
    prompt: "~/about",
    intro: "whoami, the short version, before the bullet points kick in.",
  },
  work: {
    index: "02",
    id: "work",
    nav: true,
    title: "Featured Work",
    prompt: "~/work --featured",
    intro: "Three projects that earn the top of the page: a million users, zero servers to trust, and students learning smarter.",
  },
  experience: {
    index: "03",
    id: "experience",
    nav: true,
    title: "Experience",
    prompt: "~/experience",
    intro: "git log --author=qaasim - reverse chronological, no rebases.",
  },
  projects: {
    index: "04",
    id: "projects",
    nav: true,
    title: "Projects",
    prompt: "~/projects",
    intro: "The rest of the catalogue. Flutter, a lot of Java, and one robot that hated weeds.",
  },
  skills: {
    index: "05",
    id: "skills",
    nav: true,
    title: "Skills",
    prompt: "~/skills --list",
    intro: "The toolbox. Years attached where they earn the bragging rights.",
  },
  community: {
    index: "06",
    id: "community",
    nav: true,
    title: "Community",
    prompt: "~/community",
    intro: "Leading Android tracks and turning a quiet campus into 300+ developers.",
  },
  honours: {
    index: "07",
    id: "honours",
    nav: false,
    title: "Honours & Honourable Mentions",
    prompt: "~/honours",
    intro: "A few receipts, for the skim-readers.",
  },
  contact: {
    index: "08",
    id: "contact",
    nav: true,
    title: "Contact",
    prompt: "~/contact --reply-fast",
    intro: "echo \"hello\" | mail qaasim. I read everything, I reply to most.",
  },
} as const satisfies Record<string, SectionMeta>;

export type SectionKey = keyof typeof sections;

/** Items that appear in the primary navigation, in order. */
export const navItems: readonly SectionMeta[] = Object.values(sections).filter((s) => s.nav);
