import { NextRequest, NextResponse } from "next/server";
import { runSiteAudit } from "@/lib/audit/engine";
import { createServerSupabase, createServiceSupabase } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "A valid website URL is required." }, { status: 400 });
    }

    // Run the live audit engine
    const auditResult = await runSiteAudit(url);

    // Persist to Supabase if available
    try {
      const supabase = createServiceSupabase();
      if (supabase) {
        // Save audit run
        const { data: auditRecord } = await supabase
          .from("nova_audits")
          .insert({
            target_url: auditResult.targetUrl,
            status: "completed",
            overall_score: auditResult.overallScore,
            performance_score: auditResult.performanceScore,
            seo_score: auditResult.seoScore,
            security_score: auditResult.securityScore,
            accessibility_score: auditResult.accessibilityScore,
            ssl_valid: auditResult.sslValid,
            ssl_issuer: auditResult.sslIssuer,
            detected_technologies: auditResult.detectedTechnologies,
          })
          .select("id")
          .single();

        // Save issues
        if (auditRecord?.id && auditResult.issues.length > 0) {
          const issuesToInsert = auditResult.issues.map((i) => ({
            audit_id: auditRecord.id,
            category: i.category,
            severity: i.severity,
            title: i.title,
            description: i.description,
            impact: i.impact,
            recommendation: i.recommendation,
          }));
          await supabase.from("nova_audit_issues").insert(issuesToInsert);
        }
      }
    } catch {
      // If Supabase table isn't migrated yet, proceed returning the live results directly
    }

    return NextResponse.json({ success: true, audit: auditResult });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to complete site audit." },
      { status: 500 }
    );
  }
}
