import type {
  Certificate,
  Education,
  ProjectRow,
  ServiceItem,
  ServicesPageContent,
  SiteSettings,
  Skill,
  SocialLink,
  Testimonial,
} from "./types";

export const fallbackSettings: SiteSettings = {
  id: 1,
  display_name: "Line Morelle",
  email: "hello@linemorelle.com",
  phone: "+41 44 211 55 66",
  location: "Zürich, Switzerland",
  hero_badge: "Full-Stack · Software · Engineer",
  hero_heading_before: "Building reliable,",
  hero_heading_accent: "performant",
  hero_heading_after: "web software.",
  hero_body:
    "I'm Line Morelle. I build fast, accessible web applications and backend systems with clean code and modern engineering practices.",
  portrait_path: "/images/portrait.svg",
  available: true,
  available_label: "Available for new projects",
  expertise_label: "Expertise",
  expertise_heading: "Technical Capabilities",
  portfolio_label: "Portfolio",
  portfolio_heading: "Featured Works",
  home_cta_heading_before: "Let's build your next",
  home_cta_heading_accent: "project",
  home_cta_heading_after: "together.",
  home_cta_body:
    "Have a project in mind or need an experienced developer for your team? Reach out and let's discuss your timeline and technical requirements.",
  home_cta_button: "Start a Conversation",
  projects_badge: "02 / Selected Work",
  projects_heading_before: "Recent",
  projects_heading_accent: "Engineering",
  projects_heading_after: "Projects",
  projects_intro:
    "A selection of full-stack web applications, APIs, and client projects built with modern web technologies.",
  archive_label: "More Projects Coming",
  archive_link_label: "View Archive",
  github_archive_url: "https://github.com",
  philosophy_label: "Engineering Approach",
  philosophy_heading_before: "Software built for",
  philosophy_heading_accent: "clarity and speed",
  philosophy_heading_after: ".",
  philosophy_body:
    "Good software should be intuitive for users and maintainable for developers. I focus on clean code, solid testing, and sensible architecture rather than unnecessary complexity.",
  philosophy_image_path: "/images/philosophy.svg",
  philosophy_badge: "Optimized for Web Vitals",
  projects_cta_heading_before: "Have a project in",
  projects_cta_heading_accent: "mind",
  projects_cta_heading_after: "?",
  projects_cta_body:
    "I am open to new client projects, code reviews, and technical consulting. Let's talk about what you are building.",
  contact_eyebrow: "Get in Touch",
  contact_heading_before: "Let's talk about",
  contact_heading_accent: "your project",
  contact_intro:
    "Whether you have a specific project ready to build or need technical advice on an existing application, feel free to reach out.",
  form_heading: "Send a Message",
  form_intro:
    "Tell me about your project, timeline, or questions. I reply to all messages within 24 hours.",
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
      "Crafting responsive, accessible interfaces with React, Next.js, and TypeScript - prioritizing performance and refined user experience.",
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
      "Modeling and operating SQL and NoSQL stores - PostgreSQL, MongoDB, and pipelines that keep data reliable and available.",
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

export const fallbackEducations: Education[] = [
  {
    id: "edu-msc-eth",
    degree: "Master of Science in Computer Science",
    institution: "ETH Zürich (Swiss Federal Institute of Technology)",
    period: "2019 - 2021",
    field_of_study: "Distributed Systems & High-Performance Computing",
    location: "Zürich, Switzerland",
    grade: "Summa Cum Laude (Top 3% of cohort)",
    description:
      "Deep theoretical and practical focus on distributed consensus, network performance, and low-latency storage engines. Completed master thesis on resilient state replication for geo-distributed transactional databases.",
    coursework: [
      "Distributed Systems Architecture",
      "Advanced Operating Systems",
      "Network Protocols & Formal Methods",
      "Fault-Tolerant Computing",
      "High-Performance Database Internals",
    ],
    sort_order: 0,
    published: true,
  },
  {
    id: "edu-bsc-epfl",
    degree: "Bachelor of Science in Computer Science & Systems",
    institution: "EPFL (École Polytechnique Fédérale de Lausanne)",
    period: "2016 - 2019",
    field_of_study: "Software Engineering & Computer Systems",
    location: "Lausanne, Switzerland",
    grade: "Highest Distinction",
    description:
      "Foundational computer science education with rigorous coursework in algorithm complexity, concurrency theory, compilers, and hardware-software interface design. Lead student researcher in the Distributed Information Systems laboratory.",
    coursework: [
      "Data Structures & Algorithms",
      "Computer Architecture",
      "Concurrent & Parallel Programming",
      "Database Systems",
      "Compiler Construction",
      "Applied Discrete Mathematics",
    ],
    sort_order: 1,
    published: true,
  },
  {
    id: "edu-matura-cantonal",
    degree: "Swiss Scientific Matura (Baccalauréat Scientifique)",
    institution: "Gymnase Cantonal de Lausanne",
    period: "2013 - 2016",
    field_of_study: "Advanced Mathematics & Applied Physics",
    location: "Lausanne, Switzerland",
    grade: "Honor Award for Analytical Mathematics",
    description:
      "Intensive STEM curriculum with a specialization in advanced calculus, differential equations, theoretical mechanics, and introductory algorithmic logic.",
    coursework: [
      "Advanced Calculus & Linear Algebra",
      "Classical & Quantum Physics",
      "Mathematical Modeling",
      "Algorithmic Logic",
    ],
    sort_order: 2,
    published: true,
  },
];

export const fallbackCertificates: Certificate[] = [
  {
    id: "cert-aws-pro",
    title: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    issue_date: "Oct 2023",
    expiry_date: "Oct 2026",
    credential_id: "AWS-PSA-8492041",
    credential_url: "https://aws.amazon.com/verification",
    image_path: "/images/certificates/aws-pro.svg",
    description:
      "Highest-tier cloud architecture certification validating advanced architectural design, multi-tier security, disaster recovery, and cost-effective distributed systems at enterprise scale.",
    skills: ["Cloud Architecture", "AWS", "Multi-Region Resilience", "Disaster Recovery", "Cloud Security"],
    sort_order: 0,
    published: true,
  },
  {
    id: "cert-cka",
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation & Linux Foundation",
    issue_date: "May 2023",
    expiry_date: "May 2026",
    credential_id: "CKA-2309-8812",
    credential_url: "https://www.cncf.io/certification/cka/",
    image_path: "/images/certificates/cka.svg",
    description:
      "Hands-on operational certification demonstrating production-grade Kubernetes cluster management, container networking (CNI), storage orchestration, etcd backup/restore, and runtime security.",
    skills: ["Kubernetes", "Container Orchestration", "etcd", "Linux Systems", "Service Mesh", "DevOps"],
    sort_order: 1,
    published: true,
  },
  {
    id: "cert-gcp-arch",
    title: "Google Cloud Certified - Professional Cloud Architect",
    issuer: "Google Cloud",
    issue_date: "Nov 2022",
    expiry_date: "Nov 2025",
    credential_id: "GCP-PCA-550921",
    credential_url: "https://cloud.google.com/certification",
    image_path: "/images/certificates/gcp-arch.svg",
    description:
      "Validates proficiency in architecting resilient, highly scalable enterprise solutions on Google Cloud Platform, encompassing hybrid cloud connectivity and high-throughput data pipelines.",
    skills: ["GCP", "Enterprise Architecture", "BigQuery", "Anthos", "Scalability", "Reliability Engineering"],
    sort_order: 2,
    published: true,
  },
  {
    id: "cert-terraform",
    title: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    issue_date: "Mar 2022",
    expiry_date: "Mar 2024",
    credential_id: "HCTA-003891",
    credential_url: "https://www.credly.com",
    image_path: "/images/certificates/terraform.svg",
    description:
      "Covers declarative infrastructure-as-code principles, modular state management, automated CI/CD pipeline provisioning, and cloud governance policies.",
    skills: ["Terraform", "Infrastructure as Code", "CI/CD", "State Management", "GitOps"],
    sort_order: 3,
    published: true,
  },
  {
    id: "cert-deeplearning",
    title: "Deep Learning & Neural Networks Specialization",
    issuer: "DeepLearning.AI",
    issue_date: "Aug 2021",
    expiry_date: null,
    credential_id: "DLAI-992147",
    credential_url: "https://www.deeplearning.ai",
    image_path: "/images/certificates/deeplearning.svg",
    description:
      "Comprehensive training covering modern neural network architectures, backpropagation mathematics, hyperparameter tuning, convolutional networks, and transformer attention mechanisms.",
    skills: ["Deep Learning", "PyTorch", "Transformers", "Neural Networks", "Mathematical Optimization"],
    sort_order: 4,
    published: true,
  },
];


export const fallbackServices: ServiceItem[] = [
  {
    id: "svc-custom-website",
    slug: "custom-website-development",
    icon_key: "globe",
    title_en: "Custom Website Development",
    title_fr: "Développement de Sites Web sur Mesure",
    description_en:
      "Bespoke, high-converting websites engineered for speed, elegance, and strong brand authority.",
    description_fr:
      "Sites web sur mesure à forte conversion, conçus pour la rapidité, l'élégance et l'impact de votre marque.",
    bullets_en: [
      "Responsive Swiss-inspired layout across all devices",
      "Technical SEO, OpenGraph metadata, and semantic HTML",
      "Sub-second page loads with Next.js App Router",
      "Smooth micro-interactions and accessible navigation",
    ],
    bullets_fr: [
      "Design réactif d'inspiration suisse sur tous les écrans",
      "SEO technique, métadonnées OpenGraph et HTML sémantique",
      "Chargement ultra-rapide avec Next.js App Router",
      "Micro-interactions fluides et navigation accessible",
    ],
    sort_order: 0,
    published: true,
  },
  {
    id: "svc-web-app",
    slug: "web-application-development",
    icon_key: "code",
    title_en: "Web Application Development",
    title_fr: "Développement d'Applications Web",
    description_en:
      "Full-stack SaaS platforms and interactive web apps built with React, Next.js, and TypeScript.",
    description_fr:
      "Plateformes SaaS full-stack et applications web interactives développées avec React, Next.js et TypeScript.",
    bullets_en: [
      "End-to-end architecture from database schema to client state",
      "Secure authentication, role-based access, and multi-tenancy",
      "Real-time data synchronization and resilient error handling",
      "Automated testing and CI/CD deployment pipelines",
    ],
    bullets_fr: [
      "Architecture complète du schéma de base de données à l'interface",
      "Authentification sécurisée, gestion des rôles et multi-tenant",
      "Synchronisation temps réel et gestion résiliente des erreurs",
      "Tests automatisés et pipelines de déploiement CI/CD",
    ],
    sort_order: 1,
    published: true,
  },
  {
    id: "svc-ui-to-code",
    slug: "ui-to-code",
    icon_key: "palette",
    title_en: "UI to Code (design implementation)",
    title_fr: "Intégration UI vers Code (implémentation design)",
    description_en:
      "Pixel-accurate translation of Figma designs into clean, reusable, and accessible React & Tailwind components.",
    description_fr:
      "Traduction au pixel près de vos maquettes Figma en composants React & Tailwind propres, réutilisables et accessibles.",
    bullets_en: [
      "1:1 fidelity with Figma tokens, typography, and spacing",
      "Reusable component library with clean TypeScript props",
      "WCAG AA accessibility compliance and keyboard support",
      "Fluid animations and cross-browser visual consistency",
    ],
    bullets_fr: [
      "Fidélité 1:1 aux tokens Figma, typographies et espacements",
      "Bibliothèque de composants réutilisables typés en TypeScript",
      "Conformité d'accessibilité WCAG AA et navigation clavier",
      "Animations fluides et cohérence visuelle multi-navigateurs",
    ],
    sort_order: 2,
    published: true,
  },
  {
    id: "svc-backend-api",
    slug: "backend-and-api-development",
    icon_key: "server",
    title_en: "Backend and API Development",
    title_fr: "Développement Backend et API",
    description_en:
      "Scalable REST and GraphQL APIs, database modeling, and third-party integrations built for reliability.",
    description_fr:
      "APIs REST et GraphQL évolutives, modélisation de bases de données et intégrations tierces taillées pour la fiabilité.",
    bullets_en: [
      "PostgreSQL & Supabase schema design with Row-Level Security",
      "Type-safe REST/GraphQL endpoints with strict validation",
      "Payment gateways (Stripe), webhooks, and email orchestration",
      "Rate limiting, caching layers, and structured observability",
    ],
    bullets_fr: [
      "Modélisation PostgreSQL & Supabase avec sécurité RLS",
      "Endpoints REST/GraphQL typés avec validation stricte",
      "Paiements (Stripe), webhooks et orchestration d'e-mails",
      "Limitation de débit, mise en cache et observabilité structurée",
    ],
    sort_order: 3,
    published: true,
  },
  {
    id: "svc-cms-dashboards",
    slug: "cms-and-admin-dashboards",
    icon_key: "sliders",
    title_en: "CMS and Admin Dashboards",
    title_fr: "CMS et Tableaux de Bord Admin",
    description_en:
      "Custom content management systems and internal tools that give your team full autonomy without complexity.",
    description_fr:
      "Systèmes de gestion de contenu sur mesure et outils internes offrant une autonomie totale à votre équipe.",
    bullets_en: [
      "Tailored editorial workflows, media uploads, and live previews",
      "Protected admin portals with fine-grained permissions",
      "Data visualization, analytics widgets, and exportable reports",
      "Instant cache invalidation for immediate live publishing",
    ],
    bullets_fr: [
      "Flux éditoriaux sur mesure, gestion média et aperçu en direct",
      "Portails d'administration sécurisés avec permissions fines",
      "Visualisation de données, widgets analytiques et exports",
      "Invalidation de cache instantanée pour une publication immédiate",
    ],
    sort_order: 4,
    published: true,
  },
  {
    id: "svc-perf-security",
    slug: "performance-and-security-audit",
    icon_key: "shield",
    title_en: "Performance and Security Audit",
    title_fr: "Audit de Performance et de Sécurité",
    description_en:
      "Deep diagnostic of Core Web Vitals, bundle bottlenecks, and application security posture with actionable fixes.",
    description_fr:
      "Diagnostic approfondi des Core Web Vitals, des goulets d'étranglement et de la sécurité avec correctifs concrets.",
    bullets_en: [
      "Core Web Vitals (LCP, INP, CLS) profiling and optimization",
      "Authentication, RLS policies, and API vulnerability review",
      "Database query tuning, indexing, and caching strategy",
      "Prioritized remediation roadmap or hands-on implementation",
    ],
    bullets_fr: [
      "Profilage et optimisation des Core Web Vitals (LCP, INP, CLS)",
      "Revue d'authentification, politiques RLS et sécurité des APIs",
      "Optimisation des requêtes SQL, indexation et stratégie de cache",
      "Feuille de route priorisée ou implémentation directe des correctifs",
    ],
    sort_order: 5,
    published: true,
  },
  {
    id: "svc-multilingual",
    slug: "multilingual-websites",
    icon_key: "languages",
    title_en: "Multilingual Websites (English and French)",
    title_fr: "Sites Web Multilingues (Anglais et Français)",
    description_en:
      "Seamless bilingual digital experiences with localized routing, native-grade copy, and CMS translation workflows.",
    description_fr:
      "Expériences numériques bilingues fluides avec détection de langue, contenu localisé et gestion CMS EN / FR.",
    bullets_en: [
      "Instant EN / FR language switching with locale persistence",
      "Bilingual CMS editing with automatic fallback to English",
      "Localized metadata, formatting, and accessibility attributes",
      "Native-level French and English technical copy refinement",
    ],
    bullets_fr: [
      "Bascule instantanée EN / FR avec mémorisation de la préférence",
      "Édition CMS bilingue avec repli automatique vers l'anglais",
      "Métadonnées, formats et attributs d'accessibilité localisés",
      "Soin éditorial technique en français comme en anglais",
    ],
    sort_order: 6,
    published: true,
  },
  {
    id: "svc-consulting",
    slug: "technical-consulting-and-code-review",
    icon_key: "compass",
    title_en: "Technical Consulting and Code Review",
    title_fr: "Conseil Technique et Revue de Code",
    description_en:
      "Strategic architectural guidance, stack selection, and rigorous code reviews for founders and engineering teams.",
    description_fr:
      "Accompagnement architectural stratégique, choix technologiques et revues de code rigoureuses pour vos équipes.",
    bullets_en: [
      "Architecture blueprints and technology stack evaluation",
      "In-depth pull request and repository maintainability review",
      "Refactoring strategies to eliminate technical debt safely",
      "1-on-1 engineering advisory and technical due diligence",
    ],
    bullets_fr: [
      "Plans d'architecture et évaluation de la stack technologique",
      "Revue approfondie du dépôt de code et de la maintenabilité",
      "Stratégies de refactoring pour réduire la dette technique",
      "Conseil individuel et due diligence technique pour startups",
    ],
    sort_order: 7,
    published: true,
  },
];

export const fallbackServicesPageContent: ServicesPageContent = {
  id: 1,
  hero_badge_en: "01 / Services & Capabilities",
  hero_badge_fr: "01 / Services & Prestations",
  hero_title_before_en: "Engineering digital products with",
  hero_title_before_fr: "Concevoir des produits numériques avec",
  hero_title_accent_en: "precision",
  hero_title_accent_fr: "précision",
  hero_title_after_en: "and lasting clarity.",
  hero_title_after_fr: "et clarté durable.",
  hero_subtitle_en:
    "From bespoke marketing sites to full-stack web applications and architectural audits, I partner with ambitious teams to ship fast, maintainable software.",
  hero_subtitle_fr:
    "Des sites vitrines sur mesure aux applications web full-stack et audits d'architecture, j'accompagne les équipes exigeantes pour livrer des logiciels rapides et pérennes.",
  hero_cta_en: "Request a Service",
  hero_cta_fr: "Demander un devis",
  process_badge_en: "02 / Methodology",
  process_badge_fr: "02 / Méthodologie",
  process_heading_en: "How I Work",
  process_heading_fr: "Ma Méthode de Travail",
  process_subtitle_en:
    "A transparent, structured four-stage workflow designed to eliminate guesswork and deliver production-ready results on schedule.",
  process_subtitle_fr:
    "Un processus structuré et transparent en quatre étapes pour éliminer toute incertitude et livrer un produit prêt pour la production dans les délais.",
  steps: [
    {
      number: "01",
      title_en: "Discovery",
      title_fr: "Découverte",
      description_en:
        "We clarify your business objectives, target users, technical constraints, and timeline. You receive a clear scope document, architectural plan, and fixed milestone schedule.",
      description_fr:
        "Nous définissons vos objectifs métiers, vos utilisateurs cibles, vos contraintes techniques et votre calendrier. Vous recevez un cahier des charges clair et un plan de jalons.",
    },
    {
      number: "02",
      title_en: "Design",
      title_fr: "Conception & Design",
      description_en:
        "Wireframes, component hierarchy, and database schemas are finalized. Whether working from your Figma files or crafting the interface together, every interaction is mapped out.",
      description_fr:
        "L'architecture des composants, les maquettes et le schéma de données sont validés. Que vous ayez déjà un design Figma ou non, chaque interaction est pensée en amont.",
    },
    {
      number: "03",
      title_en: "Development",
      title_fr: "Développement",
      description_en:
        "Clean, type-safe code is written in iterative sprints with a live staging link so you can test progress in real time. Performance, security, and bilingual support are built in from day one.",
      description_fr:
        "Un code propre et typé est développé par itérations avec un lien de prévisualisation en direct. Performance, sécurité et support bilingue sont intégrés dès le premier jour.",
    },
    {
      number: "04",
      title_en: "Delivery",
      title_fr: "Livraison",
      description_en:
        "After rigorous QA, accessibility checks, and Core Web Vitals verification, we deploy to production and hand over complete documentation and CMS training.",
      description_fr:
        "Après des tests rigoureux d'assurance qualité, d'accessibilité et de performance, nous déployons en production avec une documentation complète et une prise en main du CMS.",
    },
  ],
  faq_badge_en: "03 / Common Questions",
  faq_badge_fr: "03 / Questions Fréquentes",
  faq_heading_en: "Frequently Asked Questions",
  faq_heading_fr: "Foire Aux Questions",
  faq_subtitle_en:
    "Everything you need to know about timelines, revisions, payment terms, and ongoing support.",
  faq_subtitle_fr:
    "Tout ce qu'il faut savoir sur les délais, les révisions, les modalités de paiement et la maintenance.",
  faqs: [
    {
      question_en: "What is a typical project timeline?",
      question_fr: "Quel est le délai moyen pour un projet ?",
      answer_en:
        "A custom website or UI implementation typically takes 2 to 4 weeks. Full-stack web applications, custom CMS dashboards, or complex backend integrations generally take 4 to 8 weeks depending on scope. Technical audits are delivered within 5 to 7 business days.",
      answer_fr:
        "Un site web sur mesure ou une intégration UI prend généralement de 2 à 4 semaines. Les applications web complètes ou tableaux de bord CMS prennent de 4 à 8 semaines selon le périmètre. Les audits techniques sont livrés sous 5 à 7 jours ouvrés.",
    },
    {
      question_en: "How do revisions and feedback work?",
      question_fr: "Comment fonctionnent les révisions et les retours ?",
      answer_en:
        "Every milestone includes dedicated review cycles and two full rounds of revisions at no extra cost. Because you have access to a live staging environment throughout development, we catch adjustments early and collaboratively.",
      answer_fr:
        "Chaque étape inclut des cycles de validation dédiés et deux séries complètes de révisions sans frais supplémentaires. Grâce à l'environnement de prévisualisation en continu, les ajustements se font de manière fluide au fil du projet.",
    },
    {
      question_en: "How is payment structured?",
      question_fr: "Comment s'organisent les paiements ?",
      answer_en:
        "Projects are billed either at a transparent fixed price or milestone-based schedule: typically 40% upon project kickoff, 30% at the mid-project staging milestone, and 30% upon final approval and launch. Consulting and audits can also be booked as fixed packages.",
      answer_fr:
        "Les projets sont facturés au forfait avec un échéancier clair : généralement 40 % au démarrage, 30 % à la validation de la version intermédiaire et 30 % à la mise en ligne finale. Les audits et missions de conseil peuvent aussi être réservés au forfait.",
    },
    {
      question_en: "Do you offer post-launch maintenance and support?",
      question_fr: "Proposez-vous une maintenance après la mise en ligne ?",
      answer_en:
        "Yes. Every project includes 30 days of complimentary post-launch bug support. Beyond that, I offer flexible monthly retainer plans for dependency updates, security monitoring, performance tuning, and continuous feature development.",
      answer_fr:
        "Oui. Chaque projet inclut 30 jours de garantie et support correctif après le lancement. Au-delà, je propose des forfaits de maintenance mensuels flexibles pour les mises à jour de sécurité, le suivi des performances et l'ajout de fonctionnalités.",
    },
    {
      question_en: "Can you work with an existing codebase or team?",
      question_fr: "Pouvez-vous intervenir sur une base de code existante ?",
      answer_en:
        "Absolutely. Much of my work involves extending existing Next.js, React, and Supabase applications - adding new features, building CMS modules, or auditing and refactoring legacy code without disrupting live operations.",
      answer_fr:
        "Absolument. Une grande partie de mes missions consiste à faire évoluer des applications Next.js, React et Supabase existantes : ajout de fonctionnalités, création de modules CMS ou refactoring sans interrompre la production.",
    },
  ],
};
