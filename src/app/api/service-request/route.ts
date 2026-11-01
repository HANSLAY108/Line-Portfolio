import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAnonClient, createServiceClient } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sliding window IP rate limit: max 5 requests per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipHits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  ipHits.set(ip, timestamps);
  return false;
}

export async function POST(request: Request) {
  let payload: {
    fullName?: string;
    email?: string;
    serviceNeeded?: string;
    budgetRange?: string | null;
    timeline?: string | null;
    projectDetails?: string;
    companyWebsite?: string | null;
    honeypot?: string;
    startedAt?: number;
    locale?: string;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const isFr = payload.locale === "fr";
  const msg = (en: string, fr: string) => (isFr ? fr : en);

  // 1. Honeypot check
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 2. Minimum time-on-page check (2 seconds)
  const startedAt = Number(payload.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2000) {
    return NextResponse.json(
      {
        ok: false,
        code: "RATE_LIMIT",
        error: msg(
          "Please wait a moment and try again.",
          "Veuillez patienter un instant avant de réessayer.",
        ),
      },
      { status: 429 },
    );
  }

  // 3. IP Rate Limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "local";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        code: "RATE_LIMIT",
        error: msg(
          "Too many requests. Please wait a few minutes before submitting again.",
          "Trop de tentatives. Veuillez patienter quelques minutes avant de réessayer.",
        ),
      },
      { status: 429 },
    );
  }

  // 4. Field validation
  const fullName = String(payload.fullName ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const serviceNeeded = String(payload.serviceNeeded ?? "").trim();
  const budgetRange = String(payload.budgetRange ?? "").trim() || null;
  const timeline = String(payload.timeline ?? "").trim() || null;
  const projectDetails = String(payload.projectDetails ?? "").trim();
  const companyWebsite = String(payload.companyWebsite ?? "").trim() || null;

  if (fullName.length < 2 || fullName.length > 120) {
    return NextResponse.json(
      {
        ok: false,
        error: msg(
          "Please enter your full name (2 to 120 characters).",
          "Veuillez saisir votre nom complet (de 2 à 120 caractères).",
        ),
      },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email) || email.length > 160) {
    return NextResponse.json(
      {
        ok: false,
        error: msg(
          "Please enter a valid email address.",
          "Veuillez saisir une adresse e-mail valide.",
        ),
      },
      { status: 400 },
    );
  }

  if (serviceNeeded.length < 2 || serviceNeeded.length > 160) {
    return NextResponse.json(
      {
        ok: false,
        error: msg(
          "Please select a service.",
          "Veuillez sélectionner un service.",
        ),
      },
      { status: 400 },
    );
  }

  if (projectDetails.length < 15 || projectDetails.length > 5000) {
    return NextResponse.json(
      {
        ok: false,
        error: msg(
          "Please provide a few more details about your project (at least 15 characters).",
          "Veuillez décrire votre projet un peu plus en détail (au moins 15 caractères).",
        ),
      },
      { status: 400 },
    );
  }

  // 5. Save in Supabase table `service_requests`
  const supabase = createServiceClient() ?? createAnonClient();
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        error: msg(
          "The service request system is not configured yet.",
          "Le service de demande n'est pas encore configuré.",
        ),
      },
      { status: 503 },
    );
  }

  const { error: insertError } = await supabase
    .from("service_requests")
    .insert({
      full_name: fullName,
      email,
      service_needed: serviceNeeded,
      budget_range: budgetRange,
      timeline,
      project_details: projectDetails,
      company_website: companyWebsite,
    });

  if (insertError) {
    console.error(
      "[service-request] Supabase insert error:",
      insertError.message,
      insertError.code,
    );
    return NextResponse.json(
      {
        ok: false,
        error: msg(
          "Could not save your request. Please try again.",
          "Impossible d'enregistrer votre demande. Veuillez réessayer.",
        ),
      },
      { status: 500 },
    );
  }

  // 6. Send notification email to Line using the same Resend setup as Contact form
  const resendKey = process.env.RESEND_API_KEY;
  const to =
    process.env.CONTACT_TO_EMAIL ?? process.env.CONTACT_NOTIFICATION_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Line Morelle Portfolio <onboarding@resend.dev>";

  if (resendKey && to) {
    try {
      const resend = new Resend(resendKey);
      const emailLines = [
        `New Service Request from ${fullName} <${email}>`,
        `----------------------------------------`,
        `Service Needed: ${serviceNeeded}`,
        `Budget Range:   ${budgetRange ?? "Not specified"}`,
        `Timeline:       ${timeline ?? "Not specified"}`,
        `Company / URL:  ${companyWebsite ?? "Not specified"}`,
        `----------------------------------------`,
        `Project Details:`,
        projectDetails,
      ];

      await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `[Service Request] ${serviceNeeded} — ${fullName}`,
        text: emailLines.join("\n"),
      });
    } catch {
      // Request is recorded in Supabase; email delivery failure is non-fatal
    }
  }

  return NextResponse.json({ ok: true });
}

