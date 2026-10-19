export interface NovaSite {
  id: string;
  user_id: string;
  domain: string;
  label?: string | null;
  timezone: string;
  snippet_installed: boolean;
  snippet_detected_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface NovaAudit {
  id: string;
  site_id?: string | null;
  user_id?: string | null;
  target_url: string;
  status: "pending" | "scanning" | "completed" | "failed";
  overall_score?: number | null;
  performance_score?: number | null;
  seo_score?: number | null;
  security_score?: number | null;
  accessibility_score?: number | null;
  ssl_valid?: boolean | null;
  ssl_issuer?: string | null;
  ssl_expires_at?: string | null;
  detected_technologies?: any[];
  raw_headers?: Record<string, string>;
  error_message?: string | null;
  scanned_at: string;
}

export interface NovaAuditIssue {
  id: string;
  audit_id: string;
  category: "Performance" | "Security" | "SEO" | "Accessibility";
  severity: "high" | "medium" | "low" | "info";
  title: string;
  description: string;
  impact?: string | null;
  recommendation: string;
  created_at: string;
}

export interface NovaEvent {
  id: string;
  site_id: string;
  event_type: "pageview" | "custom";
  event_name?: string | null;
  path: string;
  referrer?: string | null;
  referrer_domain?: string | null;
  browser?: string | null;
  device?: "desktop" | "mobile" | "tablet" | "other" | null;
  country_code?: string | null;
  created_at: string;
}
