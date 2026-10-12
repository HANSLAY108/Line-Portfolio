import type { ProjectRow, SiteSettings, Skill, SocialLink, Testimonial } from "./types";

export const fallbackSettings: SiteSettings = {
  id: 1,
  display_name: "Line Morelle",
  email: "hello@linemorelle.com",
  phone: "+41 44 211 55 66",
  location: "Zürich, Switzerland",
  hero_badge: "Adaptable · Software · Engineer",
  hero_heading_before: "Building digital",
  hero_heading_accent: "elegance",
  hero_heading_after: "through technical precision.",
  hero_body:
    "I'm Line Morelle. I architect high-performance web applications and scalable systems with a focus on minimalist aesthetics and robust engineering.",
  portrait_path: "/images/portrait.svg",
  available: true,
  available_label: "Available for new projects",
  expertise_label: "Expertise",
  expertise_heading: "Technical Mastery",
  portfolio_label: "Portfolio",
  portfolio_heading: "Featured Works",
  home_cta_heading_before: "Let's build something",
  home_cta_heading_accent: "remarkable",
  home_cta_heading_after: ".",
  home_cta_body:
    "I am currently accepting inquiries for strategic partnerships and high-impact software projects. Let's discuss how we can create something exceptional together.",
  home_cta_button: "Start a Conversation",
  projects_badge: "02 / Portfolio Collection",
  projects_heading_before: "Curated",
  projects_heading_accent: "Engineering",
  projects_heading_after: "Works",
  projects_intro:
    "A showcase of architectural precision, technical rigor, and minimalist digital craftsmanship. From distributed systems to polished frontends.",
  archive_label: "More Projects Coming",
  archive_link_label: "View Archive",
  github_archive_url: "https://github.com",
  philosophy_label: "Philosophy",
  philosophy_heading_before: "Code as a silent, beautiful",
  philosophy_heading_accent: "utility",
  philosophy_heading_after: ".",
  philosophy_body:
    "I believe great software disappears into the experience. Every line should serve clarity, efficiency, and a Swiss-inspired sense of restraint — form following function without sacrificing beauty.",
  philosophy_image_path: "/images/philosophy.svg",
  philosophy_badge: "Optimized for Web Vitals",
  projects_cta_heading_before: "Have a specific",
  projects_cta_heading_accent: "vision",
  projects_cta_heading_after: "in mind?",
  projects_cta_body:
    "I am currently open to consulting for startups and architectural audits for enterprise teams. Let's discuss your next breakthrough.",
  contact_eyebrow: "Get in Touch",
  contact_heading_before: "Let's create",
  contact_heading_accent: "something meaningful",
  contact_intro:
    "Whether you have a specific project in mind or just want to discuss the future of digital architecture, my door is always open for strategic conversations.",
  form_heading: "Send a Brief",
  form_intro:
    "I am currently accepting new project inquiries for Q3 & Q4 2024. Please provide as much detail as possible to ensure a productive first conversation.",
  contact_stack_prompt:
    "Looking for my technical stack? Explore my specific expertise and previous works.",
  cv_path: null,
  contact_portrait_path: null,
};

export const fallbackSkills: Skill[] = [
  {
    id: "fe",
    title: "Front-end Engineering",
    description:
      "Crafting responsive, accessible interfaces with React, Next.js, and TypeScript — prioritizing performance and refined user experience.",
    icon_key: "monitor",
    section: "expertise",
    sort_order: 0,
    published: true,
  },
  {
    id: "be",
    title: "Backend Architecture",
    description:
      "Designing resilient APIs and service layers with Node.js, Go, and microservices patterns built for scale and maintainability.",
    icon_key: "server",
    section: "expertise",
    sort_order: 1,
    published: true,
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    description:
      "Provisioning and optimizing cloud environments across AWS and GCP with Docker, Kubernetes, and infrastructure as code.",
    icon_key: "cloud",
    section: "expertise",
    sort_order: 2,
    published: true,
  },
  {
    id: "data",
    title: "Data Systems",
    description:
      "Modeling and operating SQL and NoSQL stores — PostgreSQL, MongoDB, and pipelines that keep data reliable and available.",
    icon_key: "chip",
    section: "expertise",
    sort_order: 3,
    published: true,
  },
  {
    id: "perf",
    title: "Performance",
    description: "Optimization at every level of the stack.",
    icon_key: "bolt",
    section: "philosophy",
    sort_order: 0,
    published: true,
  },
  {
    id: "scale",
    title: "Scalability",
    description: "Architecting for growth and high-concurrency.",
    icon_key: "layers",
    section: "philosophy",
    sort_order: 1,
    published: true,
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "tj",
    quote:
      "Line has an extraordinary ability to translate complex business requirements into seamless digital products.",
    author_name: "Sarah Jenkins",
    author_role: "Product Director @ InnovateUI",
    avatar_path: null,
    sort_order: 0,
    published: true,
  },
];

export const fallbackProjects: ProjectRow[] = [
  {
    id: "lumina",
    title: "Lumina Dashboard",
    slug: "lumina-dashboard",
    category: "FINTECH / SaaS",
    filters: ["FRONTEND", "SAAS"],
    summary:
      "A comprehensive financial analytics dashboard that turns complex market data into clear, actionable insights for decision-makers.",
    description:
      "A high-performance financial analytics platform featuring real-time data streaming and complex SVG-based visualizations. Built with a focus on atomic design and scalable state management.",
    tags: ["REACT", "TYPESCRIPT", "NODE.JS", "AWS"],
    live_url: null,
    repo_url: null,
    cover_path: "/images/projects/lumina.svg",
    featured: true,
    sort_order: 0,
    published: true,
  },
  {
    id: "veloce",
    title: "Veloce Commerce",
    slug: "veloce-commerce",
    category: "E-COMMERCE",
    filters: ["E-COMMERCE", "FRONTEND"],
    summary:
      "A high-conversion commerce platform with real-time inventory, seamless checkout, and resilient payment orchestration.",
    description:
      "A headless e-commerce engine optimized for sub-second page loads. Implemented a custom caching layer and a seamless cross-platform checkout experience.",
    tags: ["NEXT.JS", "GRAPHQL", "SHOPIFY API", "REDIS"],
    live_url: null,
    repo_url: null,
    cover_path: "/images/projects/veloce.svg",
    featured: false,
    sort_order: 1,
    published: true,
  },
  {
    id: "nova",
    title: "Nova Analytics",
    slug: "nova-analytics",
    category: "DATA VISUALIZATION",
    filters: ["FRONTEND", "SAAS"],
    summary:
      "An interactive analytics suite that visualizes large datasets with fluid charts and serverless data processing.",
    description:
      "Real-time monitoring tool for infrastructure health. Processes millions of events per second using a distributed architecture to provide actionable insights in an elegant UI.",
    tags: ["D3.JS", "GO", "DOCKER", "KAFKA", "GRPC"],
    live_url: null,
    repo_url: null,
    cover_path: "/images/projects/nova.svg",
    featured: false,
    sort_order: 2,
    published: true,
  },
  {
    id: "aether",
    title: "Aether OS",
    slug: "aether-os",
    category: "SYSTEM DESIGN",
    filters: ["SYSTEM DESIGN"],
    summary: "A conceptual operating system designed for creative professionals.",
    description:
      "A research-driven desktop interface exploring new interaction models for spatial computing and creative workflows. Includes a built-in package manager and window compositor.",
    tags: ["RUST", "WEBGPU", "TAURI", "SYSTEMS"],
    live_url: null,
    repo_url: null,
    cover_path: "/images/projects/aether.svg",
    featured: false,
    sort_order: 3,
    published: true,
  },
];

export const fallbackSocials: SocialLink[] = [
  {
    id: "gh",
    platform: "github",
    label: "GitHub",
    url: "https://github.com",
    icon_key: "github",
    placement: "all",
    sort_order: 0,
    published: true,
  },
  {
    id: "li",
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://linkedin.com",
    icon_key: "linkedin",
    placement: "all",
    sort_order: 1,
    published: true,
  },
  {
    id: "tw",
    platform: "twitter",
    label: "Twitter / X",
    url: "https://x.com",
    icon_key: "twitter",
    placement: "all",
    sort_order: 2,
    published: true,
  },
  {
    id: "em",
    platform: "email",
    label: "hello@linemorelle.com",
    url: "mailto:hello@linemorelle.com",
    icon_key: "email",
    placement: "all",
    sort_order: 3,
    published: true,
  },
];
