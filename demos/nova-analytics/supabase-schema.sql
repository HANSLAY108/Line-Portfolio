-- ==============================================================================
-- NOVA ANALYTICS DATABASE SCHEMA & ROW LEVEL SECURITY (PHASE 2)
-- ==============================================================================

create extension if not exists "pgcrypto";

-- 1. SITES TABLE
-- Each website registered by a user for audits and snippet tracking
create table if not exists public.nova_sites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  domain text not null,
  label text,
  timezone text not null default 'UTC',
  snippet_installed boolean not null default false,
  snippet_detected_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, domain)
);

-- 2. SITE AUDITS TABLE
-- Instant link-based scanning reports
create table if not exists public.nova_audits (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references public.nova_sites (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  target_url text not null,
  status text not null default 'pending' check (status in ('pending', 'scanning', 'completed', 'failed')),
  overall_score int check (overall_score between 0 and 100),
  performance_score int check (performance_score between 0 and 100),
  seo_score int check (seo_score between 0 and 100),
  security_score int check (security_score between 0 and 100),
  accessibility_score int check (accessibility_score between 0 and 100),
  ssl_valid boolean default true,
  ssl_issuer text,
  ssl_expires_at timestamptz,
  detected_technologies jsonb default '[]'::jsonb,
  raw_headers jsonb default '{}'::jsonb,
  error_message text,
  scanned_at timestamptz not null default now()
);

-- 3. AUDIT ISSUES TABLE
-- Prioritized findings associated with an audit
create table if not exists public.nova_audit_issues (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references public.nova_audits (id) on delete cascade,
  category text not null check (category in ('Performance', 'Security', 'SEO', 'Accessibility')),
  severity text not null check (severity in ('high', 'medium', 'low', 'info')),
  title text not null,
  description text not null,
  impact text,
  recommendation text not null,
  created_at timestamptz not null default now()
);

-- 4. TRACKING EVENTS TABLE
-- Anonymous, privacy-friendly telemetry ingested from snippet
create table if not exists public.nova_events (
  id uuid primary key default gen_random_uuid(),
  site_id uuid not null references public.nova_sites (id) on delete cascade,
  event_type text not null default 'pageview' check (event_type in ('pageview', 'custom')),
  event_name text default 'pageview',
  path text not null default '/',
  referrer text,
  referrer_domain text,
  browser text,
  device text check (device in ('desktop', 'mobile', 'tablet', 'other')),
  country_code text,
  created_at timestamptz not null default now()
);

-- Indexes for performance
create index if not exists idx_nova_sites_user on public.nova_sites(user_id);
create index if not exists idx_nova_audits_site on public.nova_audits(site_id);
create index if not exists idx_nova_audits_user on public.nova_audits(user_id);
create index if not exists idx_nova_issues_audit on public.nova_audit_issues(audit_id);
create index if not exists idx_nova_events_site_created on public.nova_events(site_id, created_at desc);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.nova_sites enable row level security;
alter table public.nova_audits enable row level security;
alter table public.nova_audit_issues enable row level security;
alter table public.nova_events enable row level security;

-- NOVA SITES POLICIES
create policy "Users can view their own sites"
  on public.nova_sites for select
  using (auth.uid() = user_id);

create policy "Users can insert their own sites"
  on public.nova_sites for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own sites"
  on public.nova_sites for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own sites"
  on public.nova_sites for delete
  using (auth.uid() = user_id);

-- NOVA AUDITS POLICIES
create policy "Users can view audits for their sites or anonymous public audits"
  on public.nova_audits for select
  using (
    auth.uid() = user_id or
    site_id in (select id from public.nova_sites where user_id = auth.uid()) or
    user_id is null
  );

create policy "Users or system can insert audits"
  on public.nova_audits for insert
  with check (auth.uid() = user_id or user_id is null);

-- NOVA AUDIT ISSUES POLICIES
create policy "Users can view issues for their accessible audits"
  on public.nova_audit_issues for select
  using (
    audit_id in (
      select id from public.nova_audits
      where auth.uid() = user_id or
            site_id in (select id from public.nova_sites where user_id = auth.uid()) or
            user_id is null
    )
  );

-- NOVA EVENTS POLICIES
-- Ingestion service role or anon can insert events with valid site_id
create policy "Anyone can insert events for a registered site"
  on public.nova_events for insert
  with check (
    site_id in (select id from public.nova_sites)
  );

create policy "Users can view events only for sites they own"
  on public.nova_events for select
  using (
    site_id in (select id from public.nova_sites where user_id = auth.uid())
  );
