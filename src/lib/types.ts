export type SiteSettings = {
  id: number;
  display_name: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  hero_badge: string | null;
  hero_heading_before: string | null;
  hero_heading_accent: string | null;
  hero_heading_after: string | null;
  hero_body: string | null;
  portrait_path: string | null;
  available: boolean;
  available_label: string | null;
  expertise_label: string | null;
  expertise_heading: string | null;
  portfolio_label: string | null;
  portfolio_heading: string | null;
  home_cta_heading_before: string | null;
  home_cta_heading_accent: string | null;
  home_cta_heading_after: string | null;
  home_cta_body: string | null;
  home_cta_button: string | null;
  projects_badge: string | null;
  projects_heading_before: string | null;
  projects_heading_accent: string | null;
  projects_heading_after: string | null;
  projects_intro: string | null;
  archive_label: string | null;
  archive_link_label: string | null;
  github_archive_url: string | null;
  philosophy_label: string | null;
  philosophy_heading_before: string | null;
  philosophy_heading_accent: string | null;
  philosophy_heading_after: string | null;
  philosophy_body: string | null;
  philosophy_image_path: string | null;
  philosophy_badge: string | null;
  projects_cta_heading_before: string | null;
  projects_cta_heading_accent: string | null;
  projects_cta_heading_after: string | null;
  projects_cta_body: string | null;
  contact_eyebrow: string | null;
  contact_heading_before: string | null;
  contact_heading_accent: string | null;
  contact_intro: string | null;
  form_heading: string | null;
  form_intro: string | null;
  contact_stack_prompt: string | null;
  cv_path: string | null;
  contact_portrait_path?: string | null;
};

export type Skill = {
  id: string;
  title: string;
  description: string;
  icon_key: string;
  section: "expertise" | "philosophy";
  sort_order: number;
  published: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  avatar_path: string | null;
  sort_order: number;
  published: boolean;
};

export type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  filters: string[];
  summary: string;
  description: string;
  tags: string[];
  live_url: string | null;
  repo_url: string | null;
  cover_path: string | null;
  featured: boolean;
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

export type SocialLink = {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon_key: string;
  placement: "footer" | "contact" | "cta" | "all";
  sort_order: number;
  published: boolean;
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  field_of_study: string;
  location: string | null;
  grade: string | null;
  description: string;
  coursework: string[];
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  image_path: string | null;
  description: string | null;
  skills: string[];
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
};

export type SiteContent = {
  settings: SiteSettings | null;
  skills: Skill[];
  testimonials: Testimonial[];
  projects: ProjectRow[];
  socials: SocialLink[];
  educations?: Education[];
  certificates?: Certificate[];
};

export type Message = {
  id: string;
  full_name?: string;
  name?: string;
  email: string;
  subject?: string;
  body?: string;
  message?: string;
  read: boolean;
  created_at: string;
};

export type PostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_path: string | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};


