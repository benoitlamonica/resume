// ─── Types ────────────────────────────────────────────────────────────────────

export type SectionId =
  | "hero"
  | "ai"
  | "experience"
  | "projects"
  | "looking-for";

export type Language = 
| "CLI"
| "Express"
| "Framer Motion"
| "FastAPI"
| "GitHub"
| "Java"
| "JavaScript"
| "Laravel"
| "Node.js"
| "Other"
| "PHP"
| "Python"
| "React"
| "Redis"
| "Socket.io"
| "Storybook"
| "Stripe"
| "Svelte"
| "TailwindCSS"
| "Three.js"
| "TypeScript"
| "Vue"
| "WordPress";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface HighlightBullet {
  icon: string;
  text: string;
}

export interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  description: string;
  highlights: HighlightBullet[];
}

export interface AIWorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface AIData {
  title: string;
  subtitle: string;
  intro: string;
  philosophy: string;
  workflow: AIWorkflowStep[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  link?: string;
  role: string;
  duration: string;
  stack: Language[];
  description: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  tags: Language[];
  link?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: "github" | "email" | "linkedin";
}

export interface LookingForData {
  title: string;
  description: string;
  roles: string[];
  preference: string;
}

export interface SiteData {
  nav: NavItem[];
  hero: HeroData;
  ai: AIData;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  lookingFor: LookingForData;
  socials: SocialLink[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const name = "Benoit";

export const siteData: SiteData = {
  nav: [
    { id: "hero", label: "Home" },
    { id: "ai", label: "AI" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "looking-for", label: "Opportunities" },
  ],

  hero: {
    greeting: "Bonjour",
    name: name,
    tagline: "Full-Stack Developer",
    description:
      "French full-stack developer, specialized in back-end for the past 2 years. Passionate about modern front-end stacks — Vue.js, React, Svelte — and solid back-end with PHP, Python, and Node.js.",
    highlights: [
      { icon: "⚡", text: "API design & clean architecture" },
      { icon: "🛠", text: "Developer experience & tooling" },
      { icon: "🧩", text: "Pragmatic problem solver" },
    ],
  },

  ai: {
    title: "AI & My Workflow",
    subtitle: "How I leverage AI every day",
    intro:
      "AI is a force multiplier. It boosts my productivity, helps me discover patterns I might miss, and accelerates code review. But it is a tool, not a replacement for engineering judgment.",
    philosophy:
      'I can "vibe code" — but I choose not to. I prefer using AI as a rigorous assistant: it proposes, I decide. Every line ships with intent.',
    workflow: [
      {
        step: 1,
        title: "AI Review",
        description:
          "I use AI to check, lint, and review code — catching issues early and suggesting improvements before I invest deeper.",
      },
      {
        step: 2,
        title: "Custom Code & Decisions",
        description:
          "I write the core logic, make architectural decisions, and integrate AI suggestions only when they align with the project's goals.",
      },
      {
        step: 3,
        title: "Iterate, Test & Refactor",
        description:
          "I iterate with tests, refactor for clarity, and use AI for a final pass — ensuring quality without losing ownership of the codebase.",
      },
    ],
  },

  experience: [
    {
      id: "puremix",
      company: "Puremix",
      link: "https://puremix.com",
      role: "Full Stack Developer",
      duration: "4 years",
      stack: ["Laravel", "Python", "Vue"],
      description:
        "Built and maintained a complex web platform. Worked across the full stack — from API design and background jobs to interactive front-end features with Vue.",
    },
    {
      id: "f57",
      company: "F57",
      role: "Junior Full Stack Developer",
      duration: "2 years",
      stack: ["Laravel", "React", "WordPress", "PHP"],
      description:
        "Developed client projects end-to-end. Gained experience in multiple CMS and framework environments, delivering production-ready web applications.",
    },
  ],

  projects: [
    {
      id: "mariojs",
      title: "MarioJS",
      description:
        "Open-source JS framework that i did for little POCs and fun projects. It has a simple API for building interactive web apps with a focus on performance and developer experience. It takes what I like the most in both Vue, React & Flutter, and adds a few of my own twists.",
      tags: ["JavaScript", "TypeScript"],
    },
    {
      id: "project-b",
      title: "Project Beta",
      description:
        "CLI tool for scaffolding and automating repetitive backend tasks.",
      tags: ["Node.js", "TypeScript", "CLI"],
    },
    {
      id: "project-c",
      title: "Project Gamma",
      description:
        "Real-time collaborative editor proof-of-concept with WebSockets.",
      tags: ["React", "Socket.io", "Express"],
    },
    {
      id: "project-d",
      title: "Project Delta",
      description:
        "REST API with advanced caching, rate-limiting, and OpenAPI docs.",
      tags: ["Python", "FastAPI", "Redis"],
    },
    {
      id: "project-e",
      title: "Project Epsilon",
      description:
        "Personal portfolio & resume site with cinematic design and Three.js.",
      tags: ["React", "Three.js", "Framer Motion"],
    },
    {
      id: "project-f",
      title: "Project Zeta",
      description:
        "Open-source component library with accessible, themeable UI primitives.",
      tags: ["Vue", "Storybook", "TailwindCSS"],
    },
  ],

  lookingFor: {
    title: "What I'm Looking For",
    description:
      "Open to senior opportunities. Ready to scale up and take on higher-impact roles where I can combine deep technical skills with leadership.",
    roles: [
      "Senior Developer",
      "Lead Developer",
      "Tech Lead",
      "Engineering Manager",
      "CTO (depending on context)",
    ],
    preference:
      "Primary focus: back-end architecture & APIs. But I bring strong front-end skills too — especially with Vue.js, and also React.",
  },

  socials: [
    {
      label: "GitHub",
      url: "https://github.com/your-github",
      icon: "github",
    },
    {
      label: "Email",
      url: "mailto:hello@example.com",
      icon: "email",
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/your-linkedin",
      icon: "linkedin",
    },
  ],
};
