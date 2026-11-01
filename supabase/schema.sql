-- Line Morelle portfolio — run this in the Supabase SQL editor (once).
-- After creating Line's Auth user, insert her UUID into admin_users (see SETUP.md).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  display_name text not null default 'Line Morelle',
  email text,
  phone text,
  location text,
  hero_badge text,
  hero_heading_before text,
  hero_heading_accent text,
  hero_heading_after text,
  hero_body text,
  portrait_path text,
  available boolean not null default true,
  available_label text,
  expertise_label text,
  expertise_heading text,
  portfolio_label text,
  portfolio_heading text,
  home_cta_heading_before text,
  home_cta_heading_accent text,
  home_cta_heading_after text,
  home_cta_body text,
  home_cta_button text,
  projects_badge text,
  projects_heading_before text,
  projects_heading_accent text,
  projects_heading_after text,
  projects_intro text,
  archive_label text,
  archive_link_label text,
  github_archive_url text,
  philosophy_label text,
  philosophy_heading_before text,
  philosophy_heading_accent text,
  philosophy_heading_after text,
  philosophy_body text,
  philosophy_image_path text,
  philosophy_badge text,
  projects_cta_heading_before text,
  projects_cta_heading_accent text,
  projects_cta_heading_after text,
  projects_cta_body text,
  contact_eyebrow text,
  contact_heading_before text,
  contact_heading_accent text,
  contact_intro text,
  form_heading text,
  form_intro text,
  contact_stack_prompt text,
  cv_path text,
  contact_portrait_path text,
  updated_at timestamptz not null default now()
);

-- Ensure newly added columns exist if table was already created
alter table public.site_settings add column if not exists contact_portrait_path text;

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  icon_key text not null default 'monitor',
  section text not null check (section in ('expertise', 'philosophy')),
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author_name text not null,
  author_role text not null default '',
  avatar_path text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default '',
  filters text[] not null default '{}',
  summary text not null default '',
  description text not null default '',
  tags text[] not null default '{}',
  live_url text,
  repo_url text,
  cover_path text,
  featured boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  label text not null,
  url text not null,
  icon_key text not null default 'github',
  placement text not null default 'all'
    check (placement in ('footer', 'contact', 'cta', 'all')),
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  subject text not null,
  body text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.educations (
  id uuid primary key default gen_random_uuid(),
  degree text not null,
  institution text not null,
  period text not null,
  field_of_study text not null default '',
  location text,
  grade text,
  description text not null default '',
  coursework text[] not null default '{}',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  issue_date text not null default '',
  expiry_date text,
  credential_id text,
  credential_url text,
  image_path text,
  description text,
  skills text[] not null default '{}',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Updated-at trigger
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists skills_updated_at on public.skills;
create trigger skills_updated_at
before update on public.skills
for each row execute function public.set_updated_at();

drop trigger if exists testimonials_updated_at on public.testimonials;
create trigger testimonials_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists educations_updated_at on public.educations;
create trigger educations_updated_at
before update on public.educations
for each row execute function public.set_updated_at();

drop trigger if exists certificates_updated_at on public.certificates;
create trigger certificates_updated_at
before update on public.certificates
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Helper: is the current user Line (the only admin)?
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.skills enable row level security;
alter table public.testimonials enable row level security;
alter table public.projects enable row level security;
alter table public.social_links enable row level security;
alter table public.messages enable row level security;

-- admin_users: only the admin can read her own row
drop policy if exists "admin can read admin_users" on public.admin_users;
create policy "admin can read admin_users"
  on public.admin_users for select
  to authenticated
  using (public.is_admin());

-- site_settings: public read; admin write
drop policy if exists "public read site_settings" on public.site_settings;
create policy "public read site_settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "admin write site_settings" on public.site_settings;
create policy "admin write site_settings"
  on public.site_settings for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- skills / testimonials / projects / social: public reads published; admin all
drop policy if exists "public read published skills" on public.skills;
create policy "public read published skills"
  on public.skills for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admin write skills" on public.skills;
create policy "admin write skills"
  on public.skills for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "public read published testimonials" on public.testimonials;
create policy "public read published testimonials"
  on public.testimonials for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admin write testimonials" on public.testimonials;
create policy "admin write testimonials"
  on public.testimonials for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "public read published projects" on public.projects;
create policy "public read published projects"
  on public.projects for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admin write projects" on public.projects;
create policy "admin write projects"
  on public.projects for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "public read published social_links" on public.social_links;
create policy "public read published social_links"
  on public.social_links for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admin write social_links" on public.social_links;
create policy "admin write social_links"
  on public.social_links for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- educations / certificates: public reads published; admin all
alter table public.educations enable row level security;
alter table public.certificates enable row level security;

drop policy if exists "public read published educations" on public.educations;
create policy "public read published educations"
  on public.educations for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admin write educations" on public.educations;
create policy "admin write educations"
  on public.educations for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "public read published certificates" on public.certificates;
create policy "public read published certificates"
  on public.certificates for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admin write certificates" on public.certificates;
create policy "admin write certificates"
  on public.certificates for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- messages: no public select; inserts happen via service role in the API
drop policy if exists "admin read messages" on public.messages;
create policy "admin read messages"
  on public.messages for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin update messages" on public.messages;
create policy "admin update messages"
  on public.messages for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin delete messages" on public.messages;
create policy "admin delete messages"
  on public.messages for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage bucket
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "public read media" on storage.objects;
create policy "public read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "admin upload media" on storage.objects;
create policy "admin upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "admin update media" on storage.objects;
create policy "admin update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "admin delete media" on storage.objects;
create policy "admin delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Seed: current site copy (safe to re-run)
-- ---------------------------------------------------------------------------

insert into public.site_settings (
  id, display_name, email, phone, location,
  hero_badge, hero_heading_before, hero_heading_accent, hero_heading_after, hero_body,
  available, available_label,
  expertise_label, expertise_heading,
  portfolio_label, portfolio_heading,
  home_cta_heading_before, home_cta_heading_accent, home_cta_heading_after,
  home_cta_body, home_cta_button,
  projects_badge, projects_heading_before, projects_heading_accent, projects_heading_after, projects_intro,
  archive_label, archive_link_label, github_archive_url,
  philosophy_label, philosophy_heading_before, philosophy_heading_accent, philosophy_heading_after, philosophy_body, philosophy_badge,
  projects_cta_heading_before, projects_cta_heading_accent, projects_cta_heading_after, projects_cta_body,
  contact_eyebrow, contact_heading_before, contact_heading_accent, contact_intro,
  form_heading, form_intro, contact_stack_prompt
) values (
  1, 'Line Morelle', 'hello@linemorelle.com', '+41 44 211 55 66', 'Zürich, Switzerland',
  'Adaptable · Software · Engineer',
  'Building digital', 'elegance', 'through technical precision.',
  'I''m Line Morelle. I architect high-performance web applications and scalable systems with a focus on minimalist aesthetics and robust engineering.',
  true, 'Available for new projects',
  'Expertise', 'Technical Mastery',
  'Portfolio', 'Featured Works',
  'Let''s build something', 'remarkable', '.',
  'I am currently accepting inquiries for strategic partnerships and high-impact software projects. Let''s discuss how we can create something exceptional together.',
  'Start a Conversation',
  '02 / Portfolio Collection',
  'Curated', 'Engineering', 'Works',
  'A showcase of architectural precision, technical rigor, and minimalist digital craftsmanship. From distributed systems to polished frontends.',
  'More Projects Coming', 'View Archive', 'https://github.com',
  'Philosophy', 'Code as a silent, beautiful', 'utility', '.',
  'I believe great software disappears into the experience. Every line should serve clarity, efficiency, and a Swiss-inspired sense of restraint — form following function without sacrificing beauty.',
  'Optimized for Web Vitals',
  'Have a specific', 'vision', 'in mind?',
  'I am currently open to consulting for startups and architectural audits for enterprise teams. Let''s discuss your next breakthrough.',
  'Get in Touch', 'Let''s create', 'something meaningful',
  'Whether you have a specific project in mind or just want to discuss the future of digital architecture, my door is always open for strategic conversations.',
  'Send a Brief',
  'I am currently accepting new project inquiries for Q3 & Q4 2024. Please provide as much detail as possible to ensure a productive first conversation.',
  'Looking for my technical stack? Explore my specific expertise and previous works.'
)
on conflict (id) do nothing;

insert into public.skills (title, description, icon_key, section, sort_order)
select * from (values
  ('Front-end Engineering', 'Crafting responsive, accessible interfaces with React, Next.js, and TypeScript — prioritizing performance and refined user experience.', 'monitor', 'expertise', 0),
  ('Backend Architecture', 'Designing resilient APIs and service layers with Node.js, Go, and microservices patterns built for scale and maintainability.', 'server', 'expertise', 1),
  ('Cloud Infrastructure', 'Provisioning and optimizing cloud environments across AWS and GCP with Docker, Kubernetes, and infrastructure as code.', 'cloud', 'expertise', 2),
  ('Data Systems', 'Modeling and operating SQL and NoSQL stores — PostgreSQL, MongoDB, and pipelines that keep data reliable and available.', 'chip', 'expertise', 3),
  ('Performance', 'Optimization at every level of the stack.', 'bolt', 'philosophy', 0),
  ('Scalability', 'Architecting for growth and high-concurrency.', 'layers', 'philosophy', 1)
) as v(title, description, icon_key, section, sort_order)
where not exists (select 1 from public.skills);

insert into public.testimonials (quote, author_name, author_role, sort_order)
select * from (values
  (
    'Line has an extraordinary ability to translate complex business requirements into seamless digital products.',
    'Sarah Jenkins',
    'Product Director @ InnovateUI',
    0
  )
) as v(quote, author_name, author_role, sort_order)
where not exists (select 1 from public.testimonials);

insert into public.projects (title, slug, category, filters, summary, description, tags, featured, sort_order)
select * from (values
  (
    'Lumina Dashboard',
    'lumina-dashboard',
    'FINTECH / SaaS',
    array['FRONTEND','SAAS']::text[],
    'A comprehensive financial analytics dashboard that turns complex market data into clear, actionable insights for decision-makers.',
    'A high-performance financial analytics platform featuring real-time data streaming and complex SVG-based visualizations. Built with a focus on atomic design and scalable state management.',
    array['REACT','TYPESCRIPT','NODE.JS','AWS']::text[],
    true,
    0
  ),
  (
    'Veloce Commerce',
    'veloce-commerce',
    'E-COMMERCE',
    array['E-COMMERCE','FRONTEND']::text[],
    'A high-conversion commerce platform with real-time inventory, seamless checkout, and resilient payment orchestration.',
    'A headless e-commerce engine optimized for sub-second page loads. Implemented a custom caching layer and a seamless cross-platform checkout experience.',
    array['NEXT.JS','GRAPHQL','SHOPIFY API','REDIS']::text[],
    false,
    1
  ),
  (
    'Nova Analytics',
    'nova-analytics',
    'DATA VISUALIZATION',
    array['FRONTEND','SAAS']::text[],
    'An interactive analytics suite that visualizes large datasets with fluid charts and serverless data processing.',
    'Real-time monitoring tool for infrastructure health. Processes millions of events per second using a distributed architecture to provide actionable insights in an elegant UI.',
    array['D3.JS','GO','DOCKER','KAFKA','GRPC']::text[],
    false,
    2
  ),
  (
    'Aether OS',
    'aether-os',
    'SYSTEM DESIGN',
    array['SYSTEM DESIGN']::text[],
    'A conceptual operating system designed for creative professionals.',
    'A conceptual operating system designed for creative professionals. Focuses on spatial layout, fluid typography, and hardware-accelerated interface components.',
    array['RUST','WEBASSEMBLY','OPENTYPE','CANVAS API']::text[],
    false,
    3
  )
) as v(title, slug, category, filters, summary, description, tags, featured, sort_order)
where not exists (select 1 from public.projects);

insert into public.social_links (platform, label, url, icon_key, placement, sort_order)
select * from (values
  ('github', 'Github', 'https://github.com', 'github', 'all', 0),
  ('linkedin', 'LinkedIn', 'https://linkedin.com', 'linkedin', 'all', 1),
  ('email', 'Email', 'mailto:hello@linemorelle.com', 'email', 'footer', 2),
  ('twitter', 'X / Twitter', 'https://x.com', 'twitter', 'contact', 3)
) as v(platform, label, url, icon_key, placement, sort_order)
where not exists (select 1 from public.social_links);

insert into public.educations (degree, institution, period, field_of_study, location, grade, description, coursework, sort_order)
select * from (values
  (
    'Master of Science in Computer Science',
    'ETH Zürich (Swiss Federal Institute of Technology)',
    '2019 — 2021',
    'Distributed Systems & High-Performance Computing',
    'Zürich, Switzerland',
    'Summa Cum Laude (Top 3% of cohort)',
    'Deep theoretical and practical focus on distributed consensus, network performance, and low-latency storage engines. Completed master thesis on resilient state replication for geo-distributed transactional databases.',
    array['Distributed Systems Architecture','Advanced Operating Systems','Network Protocols & Formal Methods','Fault-Tolerant Computing','High-Performance Database Internals']::text[],
    0
  ),
  (
    'Bachelor of Science in Computer Science & Systems',
    'EPFL (École Polytechnique Fédérale de Lausanne)',
    '2016 — 2019',
    'Software Engineering & Computer Systems',
    'Lausanne, Switzerland',
    'Highest Distinction',
    'Foundational computer science education with rigorous coursework in algorithm complexity, concurrency theory, compilers, and hardware-software interface design. Lead student researcher in the Distributed Information Systems laboratory.',
    array['Data Structures & Algorithms','Computer Architecture','Concurrent & Parallel Programming','Database Systems','Compiler Construction','Applied Discrete Mathematics']::text[],
    1
  ),
  (
    'Swiss Scientific Matura (Baccalauréat Scientifique)',
    'Gymnase Cantonal de Lausanne',
    '2013 — 2016',
    'Advanced Mathematics & Applied Physics',
    'Lausanne, Switzerland',
    'Honor Award for Analytical Mathematics',
    'Intensive STEM curriculum with a specialization in advanced calculus, differential equations, theoretical mechanics, and introductory algorithmic logic.',
    array['Advanced Calculus & Linear Algebra','Classical & Quantum Physics','Mathematical Modeling','Algorithmic Logic']::text[],
    2
  )
) as v(degree, institution, period, field_of_study, location, grade, description, coursework, sort_order)
where not exists (select 1 from public.educations);

insert into public.certificates (title, issuer, issue_date, expiry_date, credential_id, credential_url, image_path, description, skills, sort_order)
select * from (values
  (
    'AWS Certified Solutions Architect – Professional',
    'Amazon Web Services',
    'Oct 2023',
    'Oct 2026',
    'AWS-PSA-8492041',
    'https://aws.amazon.com/verification',
    '/images/certificates/aws-pro.svg',
    'Highest-tier cloud architecture certification validating advanced architectural design, multi-tier security, disaster recovery, and cost-effective distributed systems at enterprise scale.',
    array['Cloud Architecture','AWS','Multi-Region Resilience','Disaster Recovery','Cloud Security']::text[],
    0
  ),
  (
    'Certified Kubernetes Administrator (CKA)',
    'Cloud Native Computing Foundation & Linux Foundation',
    'May 2023',
    'May 2026',
    'CKA-2309-8812',
    'https://www.cncf.io/certification/cka/',
    '/images/certificates/cka.svg',
    'Hands-on operational certification demonstrating production-grade Kubernetes cluster management, container networking (CNI), storage orchestration, etcd backup/restore, and runtime security.',
    array['Kubernetes','Container Orchestration','etcd','Linux Systems','Service Mesh','DevOps']::text[],
    1
  ),
  (
    'Google Cloud Certified – Professional Cloud Architect',
    'Google Cloud',
    'Nov 2022',
    'Nov 2025',
    'GCP-PCA-550921',
    'https://cloud.google.com/certification',
    '/images/certificates/gcp-arch.svg',
    'Validates proficiency in architecting resilient, highly scalable enterprise solutions on Google Cloud Platform, encompassing hybrid cloud connectivity and high-throughput data pipelines.',
    array['GCP','Enterprise Architecture','BigQuery','Anthos','Scalability','Reliability Engineering']::text[],
    2
  ),
  (
    'HashiCorp Certified: Terraform Associate',
    'HashiCorp',
    'Mar 2022',
    'Mar 2024',
    'HCTA-003891',
    'https://www.credly.com',
    '/images/certificates/terraform.svg',
    'Covers declarative infrastructure-as-code principles, modular state management, automated CI/CD pipeline provisioning, and cloud governance policies.',
    array['Terraform','Infrastructure as Code','CI/CD','State Management','GitOps']::text[],
    3
  ),
  (
    'Deep Learning & Neural Networks Specialization',
    'DeepLearning.AI',
    'Aug 2021',
    null,
    'DLAI-992147',
    'https://www.deeplearning.ai',
    '/images/certificates/deeplearning.svg',
    'Comprehensive training covering modern neural network architectures, backpropagation mathematics, hyperparameter tuning, convolutional networks, and transformer attention mechanisms.',
    array['Deep Learning','PyTorch','Transformers','Neural Networks','Mathematical Optimization']::text[],
    4
  )
) as v(title, issuer, issue_date, expiry_date, credential_id, credential_url, image_path, description, skills, sort_order)
where not exists (select 1 from public.certificates);


-- ---------------------------------------------------------------------------
-- Services Page: services, services_page_content, service_requests
-- ---------------------------------------------------------------------------

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  icon_key text not null default 'globe',
  title_en text not null,
  title_fr text not null default '',
  description_en text not null default '',
  description_fr text not null default '',
  bullets_en text[] not null default '{}',
  bullets_fr text[] not null default '{}',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services_page_content (
  id int primary key default 1 check (id = 1),
  hero_badge_en text not null default '01 / Services & Capabilities',
  hero_badge_fr text not null default '01 / Services & Prestations',
  hero_title_before_en text not null default 'Engineering digital products with',
  hero_title_before_fr text not null default 'Concevoir des produits numériques avec',
  hero_title_accent_en text not null default 'precision',
  hero_title_accent_fr text not null default 'précision',
  hero_title_after_en text not null default 'and lasting clarity.',
  hero_title_after_fr text not null default 'et clarté durable.',
  hero_subtitle_en text not null default 'From bespoke marketing sites to full-stack web applications and architectural audits, I partner with ambitious teams to ship fast, maintainable software.',
  hero_subtitle_fr text not null default 'Des sites vitrines sur mesure aux applications web full-stack et audits d''architecture, j''accompagne les équipes exigeantes pour livrer des logiciels rapides et pérennes.',
  hero_cta_en text not null default 'Request a Service',
  hero_cta_fr text not null default 'Demander un devis',
  process_badge_en text not null default '02 / Methodology',
  process_badge_fr text not null default '02 / Méthodologie',
  process_heading_en text not null default 'How I Work',
  process_heading_fr text not null default 'Ma Méthode de Travail',
  process_subtitle_en text not null default 'A transparent, structured four-stage workflow designed to eliminate guesswork and deliver production-ready results on schedule.',
  process_subtitle_fr text not null default 'Un processus structuré et transparent en quatre étapes pour éliminer toute incertitude et livrer un produit prêt pour la production dans les délais.',
  steps jsonb not null default '[]'::jsonb,
  faq_badge_en text not null default '03 / Common Questions',
  faq_badge_fr text not null default '03 / Questions Fréquentes',
  faq_heading_en text not null default 'Frequently Asked Questions',
  faq_heading_fr text not null default 'Foire Aux Questions',
  faq_subtitle_en text not null default 'Everything you need to know about timelines, revisions, payment terms, and ongoing support.',
  faq_subtitle_fr text not null default 'Tout ce qu''il faut savoir sur les délais, les révisions, les modalités de paiement et la maintenance.',
  faqs jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  service_needed text not null,
  budget_range text,
  timeline text,
  project_details text not null,
  company_website text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists services_page_content_updated_at on public.services_page_content;
create trigger services_page_content_updated_at
before update on public.services_page_content
for each row execute function public.set_updated_at();

alter table public.services enable row level security;
alter table public.services_page_content enable row level security;
alter table public.service_requests enable row level security;

-- services: public reads published; admin all
drop policy if exists "public read published services" on public.services;
create policy "public read published services"
  on public.services for select
  to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admin write services" on public.services;
create policy "admin write services"
  on public.services for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- services_page_content: public read; admin write
drop policy if exists "public read services_page_content" on public.services_page_content;
create policy "public read services_page_content"
  on public.services_page_content for select
  to anon, authenticated
  using (true);

drop policy if exists "admin write services_page_content" on public.services_page_content;
create policy "admin write services_page_content"
  on public.services_page_content for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- service_requests: public can only insert; only admin can read, update, delete
drop policy if exists "public insert service_requests" on public.service_requests;
create policy "public insert service_requests"
  on public.service_requests for insert
  to anon, authenticated
  with check (true);

drop policy if exists "admin read service_requests" on public.service_requests;
create policy "admin read service_requests"
  on public.service_requests for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin update service_requests" on public.service_requests;
create policy "admin update service_requests"
  on public.service_requests for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin delete service_requests" on public.service_requests;
create policy "admin delete service_requests"
  on public.service_requests for delete
  to authenticated
  using (public.is_admin());

-- Seed the 8 services
insert into public.services (
  slug, icon_key, title_en, title_fr, description_en, description_fr, bullets_en, bullets_fr, sort_order, published
)
select * from (values
  (
    'custom-website-development',
    'globe',
    'Custom Website Development',
    'Développement de Sites Web sur Mesure',
    'Bespoke, high-converting websites engineered for speed, elegance, and strong brand authority.',
    'Sites web sur mesure à forte conversion, conçus pour la rapidité, l''élégance et l''impact de votre marque.',
    array[
      'Responsive Swiss-inspired layout across all devices',
      'Technical SEO, OpenGraph metadata, and semantic HTML',
      'Sub-second page loads with Next.js App Router',
      'Smooth micro-interactions and accessible navigation'
    ]::text[],
    array[
      'Design réactif d''inspiration suisse sur tous les écrans',
      'SEO technique, métadonnées OpenGraph et HTML sémantique',
      'Chargement ultra-rapide avec Next.js App Router',
      'Micro-interactions fluides et navigation accessible'
    ]::text[],
    0,
    true
  ),
  (
    'web-application-development',
    'code',
    'Web Application Development',
    'Développement d''Applications Web',
    'Full-stack SaaS platforms and interactive web apps built with React, Next.js, and TypeScript.',
    'Plateformes SaaS full-stack et applications web interactives développées avec React, Next.js et TypeScript.',
    array[
      'End-to-end architecture from database schema to client state',
      'Secure authentication, role-based access, and multi-tenancy',
      'Real-time data synchronization and resilient error handling',
      'Automated testing and CI/CD deployment pipelines'
    ]::text[],
    array[
      'Architecture complète du schéma de base de données à l''interface',
      'Authentification sécurisée, gestion des rôles et multi-tenant',
      'Synchronisation temps réel et gestion résiliente des erreurs',
      'Tests automatisés et pipelines de déploiement CI/CD'
    ]::text[],
    1,
    true
  ),
  (
    'ui-to-code',
    'palette',
    'UI to Code (design implementation)',
    'Intégration UI vers Code (implémentation design)',
    'Pixel-accurate translation of Figma designs into clean, reusable, and accessible React & Tailwind components.',
    'Traduction au pixel près de vos maquettes Figma en composants React & Tailwind propres, réutilisables et accessibles.',
    array[
      '1:1 fidelity with Figma tokens, typography, and spacing',
      'Reusable component library with clean TypeScript props',
      'WCAG AA accessibility compliance and keyboard support',
      'Fluid animations and cross-browser visual consistency'
    ]::text[],
    array[
      'Fidélité 1:1 aux tokens Figma, typographies et espacements',
      'Bibliothèque de composants réutilisables typés en TypeScript',
      'Conformité d''accessibilité WCAG AA et navigation clavier',
      'Animations fluides et cohérence visuelle multi-navigateurs'
    ]::text[],
    2,
    true
  ),
  (
    'backend-and-api-development',
    'server',
    'Backend and API Development',
    'Développement Backend et API',
    'Scalable REST and GraphQL APIs, database modeling, and third-party integrations built for reliability.',
    'APIs REST et GraphQL évolutives, modélisation de bases de données et intégrations tierces taillées pour la fiabilité.',
    array[
      'PostgreSQL & Supabase schema design with Row-Level Security',
      'Type-safe REST/GraphQL endpoints with strict validation',
      'Payment gateways (Stripe), webhooks, and email orchestration',
      'Rate limiting, caching layers, and structured observability'
    ]::text[],
    array[
      'Modélisation PostgreSQL & Supabase avec sécurité RLS',
      'Endpoints REST/GraphQL typés avec validation stricte',
      'Paiements (Stripe), webhooks et orchestration d''e-mails',
      'Limitation de débit, mise en cache et observabilité structurée'
    ]::text[],
    3,
    true
  ),
  (
    'cms-and-admin-dashboards',
    'sliders',
    'CMS and Admin Dashboards',
    'CMS et Tableaux de Bord Admin',
    'Custom content management systems and internal tools that give your team full autonomy without complexity.',
    'Systèmes de gestion de contenu sur mesure et outils internes offrant une autonomie totale à votre équipe.',
    array[
      'Tailored editorial workflows, media uploads, and live previews',
      'Protected admin portals with fine-grained permissions',
      'Data visualization, analytics widgets, and exportable reports',
      'Instant cache invalidation for immediate live publishing'
    ]::text[],
    array[
      'Flux éditoriaux sur mesure, gestion média et aperçu en direct',
      'Portails d''administration sécurisés avec permissions fines',
      'Visualisation de données, widgets analytiques et exports',
      'Invalidation de cache instantanée pour une publication immédiate'
    ]::text[],
    4,
    true
  ),
  (
    'performance-and-security-audit',
    'shield',
    'Performance and Security Audit',
    'Audit de Performance et de Sécurité',
    'Deep diagnostic of Core Web Vitals, bundle bottlenecks, and application security posture with actionable fixes.',
    'Diagnostic approfondi des Core Web Vitals, des goulets d''étranglement et de la sécurité avec correctifs concrets.',
    array[
      'Core Web Vitals (LCP, INP, CLS) profiling and optimization',
      'Authentication, RLS policies, and API vulnerability review',
      'Database query tuning, indexing, and caching strategy',
      'Prioritized remediation roadmap or hands-on implementation'
    ]::text[],
    array[
      'Profilage et optimisation des Core Web Vitals (LCP, INP, CLS)',
      'Revue d''authentification, politiques RLS et sécurité des APIs',
      'Optimisation des requêtes SQL, indexation et stratégie de cache',
      'Feuille de route priorisée ou implémentation directe des correctifs'
    ]::text[],
    5,
    true
  ),
  (
    'multilingual-websites',
    'languages',
    'Multilingual Websites (English and French)',
    'Sites Web Multilingues (Anglais et Français)',
    'Seamless bilingual digital experiences with localized routing, native-grade copy, and CMS translation workflows.',
    'Expériences numériques bilingues fluides avec détection de langue, contenu localisé et gestion CMS EN / FR.',
    array[
      'Instant EN / FR language switching with locale persistence',
      'Bilingual CMS editing with automatic fallback to English',
      'Localized metadata, formatting, and accessibility attributes',
      'Native-level French and English technical copy refinement'
    ]::text[],
    array[
      'Bascule instantanée EN / FR avec mémorisation de la préférence',
      'Édition CMS bilingue avec repli automatique vers l''anglais',
      'Métadonnées, formats et attributs d''accessibilité localisés',
      'Soin éditorial technique en français comme en anglais'
    ]::text[],
    6,
    true
  ),
  (
    'technical-consulting-and-code-review',
    'compass',
    'Technical Consulting and Code Review',
    'Conseil Technique et Revue de Code',
    'Strategic architectural guidance, stack selection, and rigorous code reviews for founders and engineering teams.',
    'Accompagnement architectural stratégique, choix technologiques et revues de code rigoureuses pour vos équipes.',
    array[
      'Architecture blueprints and technology stack evaluation',
      'In-depth pull request and repository maintainability review',
      'Refactoring strategies to eliminate technical debt safely',
      '1-on-1 engineering advisory and technical due diligence'
    ]::text[],
    array[
      'Plans d''architecture et évaluation de la stack technologique',
      'Revue approfondie du dépôt de code et de la maintenabilité',
      'Stratégies de refactoring pour réduire la dette technique',
      'Conseil individuel et due diligence technique pour startups'
    ]::text[],
    7,
    true
  )
) as v(slug, icon_key, title_en, title_fr, description_en, description_fr, bullets_en, bullets_fr, sort_order, published)
on conflict (slug) do nothing;

insert into public.services_page_content (
  id,
  steps,
  faqs
) values (
  1,
  '[
    {
      "number": "01",
      "title_en": "Discovery",
      "title_fr": "Découverte",
      "description_en": "We clarify your business objectives, target users, technical constraints, and timeline. You receive a clear scope document, architectural plan, and fixed milestone schedule.",
      "description_fr": "Nous définissons vos objectifs métiers, vos utilisateurs cibles, vos contraintes techniques et votre calendrier. Vous recevez un cahier des charges clair et un plan de jalons."
    },
    {
      "number": "02",
      "title_en": "Design",
      "title_fr": "Conception & Design",
      "description_en": "Wireframes, component hierarchy, and database schemas are finalized. Whether working from your Figma files or crafting the interface together, every interaction is mapped out.",
      "description_fr": "L''architecture des composants, les maquettes et le schéma de données sont validés. Que vous ayez déjà un design Figma ou non, chaque interaction est pensée en amont."
    },
    {
      "number": "03",
      "title_en": "Development",
      "title_fr": "Développement",
      "description_en": "Clean, type-safe code is written in iterative sprints with a live staging link so you can test progress in real time. Performance, security, and bilingual support are built in from day one.",
      "description_fr": "Un code propre et typé est développé par itérations avec un lien de prévisualisation en direct. Performance, sécurité et support bilingue sont intégrés dès le premier jour."
    },
    {
      "number": "04",
      "title_en": "Delivery",
      "title_fr": "Livraison",
      "description_en": "After rigorous QA, accessibility checks, and Core Web Vitals verification, we deploy to production and hand over complete documentation and CMS training.",
      "description_fr": "Après des tests rigoureux d''assurance qualité, d''accessibilité et de performance, nous déployons en production avec une documentation complète et une prise en main du CMS."
    }
  ]'::jsonb,
  '[
    {
      "question_en": "What is a typical project timeline?",
      "question_fr": "Quel est le délai moyen pour un projet ?",
      "answer_en": "A custom website or UI implementation typically takes 2 to 4 weeks. Full-stack web applications, custom CMS dashboards, or complex backend integrations generally take 4 to 8 weeks depending on scope. Technical audits are delivered within 5 to 7 business days.",
      "answer_fr": "Un site web sur mesure ou une intégration UI prend généralement de 2 à 4 semaines. Les applications web complètes ou tableaux de bord CMS prennent de 4 à 8 semaines selon le périmètre. Les audits techniques sont livrés sous 5 à 7 jours ouvrés."
    },
    {
      "question_en": "How do revisions and feedback work?",
      "question_fr": "Comment fonctionnent les révisions et les retours ?",
      "answer_en": "Every milestone includes dedicated review cycles and two full rounds of revisions at no extra cost. Because you have access to a live staging environment throughout development, we catch adjustments early and collaboratively.",
      "answer_fr": "Chaque étape inclut des cycles de validation dédiés et deux séries complètes de révisions sans frais supplémentaires. Grâce à l''environnement de prévisualisation en continu, les ajustements se font de manière fluide au fil du projet."
    },
    {
      "question_en": "How is payment structured?",
      "question_fr": "Comment s''organisent les paiements ?",
      "answer_en": "Projects are billed either at a transparent fixed price or milestone-based schedule: typically 40% upon project kickoff, 30% at the mid-project staging milestone, and 30% upon final approval and launch. Consulting and audits can also be booked as fixed packages.",
      "answer_fr": "Les projets sont facturés au forfait avec un échéancier clair : généralement 40 % au démarrage, 30 % à la validation de la version intermédiaire et 30 % à la mise en ligne finale. Les audits et missions de conseil peuvent aussi être réservés au forfait."
    },
    {
      "question_en": "Do you offer post-launch maintenance and support?",
      "question_fr": "Proposez-vous une maintenance après la mise en ligne ?",
      "answer_en": "Yes. Every project includes 30 days of complimentary post-launch bug support. Beyond that, I offer flexible monthly retainer plans for dependency updates, security monitoring, performance tuning, and continuous feature development.",
      "answer_fr": "Oui. Chaque projet inclut 30 jours de garantie et support correctif après le lancement. Au-delà, je propose des forfaits de maintenance mensuels flexibles pour les mises à jour de sécurité, le suivi des performances et l''ajout de fonctionnalités."
    },
    {
      "question_en": "Can you work with an existing codebase or team?",
      "question_fr": "Pouvez-vous intervenir sur une base de code existante ?",
      "answer_en": "Absolutely. Much of my work involves extending existing Next.js, React, and Supabase applications—adding new features, building CMS modules, or auditing and refactoring legacy code without disrupting live operations.",
      "answer_fr": "Absolument. Une grande partie de mes missions consiste à faire évoluer des applications Next.js, React et Supabase existantes : ajout de fonctionnalités, création de modules CMS ou refactoring sans interrompre la production."
    }
  ]'::jsonb
)
on conflict (id) do nothing;
