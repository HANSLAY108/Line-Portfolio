import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAnonClient, createServiceClient } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: {
    fullName?: string;
    email?: string;
    subject?: string;
    message?: string;
    company?: string;
    startedAt?: number;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (payload.company && payload.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const startedAt = Number(payload.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2000) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please wait a moment and try again.",
      },
      { status: 429 },
    );
  }

  const fullName = String(payload.fullName ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const subject = String(payload.subject ?? "").trim();
  const body = String(payload.message ?? "").trim();

  if (fullName.length < 2 || fullName.length > 120) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please enter your name.",
      },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email) || email.length > 160) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please enter a valid email.",
      },
      { status: 400 },
    );
  }
  if (subject.length < 2 || subject.length > 160) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please enter a subject.",
      },
      { status: 400 },
    );
  }
  if (body.length < 10 || body.length > 5000) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please write a slightly longer message.",
      },
      { status: 400 },
    );
  }

  // Try service client first (bypasses RLS); fall back to anon client
  // (requires an INSERT policy on messages for anon — see schema.sql)
  const supabase = createServiceClient() ?? createAnonClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "The contact service is not configured yet." },
      { status: 503 },
    );
  }

  const { error: insertError } = await supabase.from("messages").insert({
    full_name: fullName,
    email,
    subject,
    body,
  });

  if (insertError) {
    console.error("[contact] Supabase insert error:", insertError.message, insertError.code);
    return NextResponse.json(
      { ok: false, error: "Could not save message. Please try again." },
      { status: 500 },
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? process.env.CONTACT_NOTIFICATION_EMAIL;
  if (resendKey && to) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Line Morelle Portfolio <onboarding@resend.dev>",
        to,
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${fullName} <${email}>\n\n${body}`,
      });
    } catch {
      // Message is recorded in Supabase, email delivery failure is non-fatal
    }
  }

  return NextResponse.json({ ok: true });
}
