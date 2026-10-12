"use client";

import { FormEvent, useEffect, useState } from "react";
import { SendIcon } from "@/components/icons";

type ContactFormProps = {
  heading?: string | null;
  intro?: string | null;
};

export default function ContactForm({ heading, intro }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(data.get("fullName") ?? ""),
          email: String(data.get("email") ?? ""),
          subject: String(data.get("subject") ?? ""),
          message: String(data.get("message") ?? ""),
          company: String(data.get("company") ?? ""),
          startedAt,
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setError(payload.error || "Something went wrong. Please try again.");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error. Please try again in a moment.");
    }
  }

  return (
    <div>
      <h2 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
        {heading || "Send a Brief"}
      </h2>
      <p className="mt-3 max-w-lg text-[14px] leading-[1.7] text-muted">
        {intro ||
          "I am currently accepting new project inquiries for Q3 & Q4 2024. Please provide as much detail as possible to ensure a productive first conversation."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Name + Email row */}
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id="fullName"
            label="Full Name"
            type="text"
            placeholder="Jane Doe"
            required
          />
          <Field
            id="email"
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            required
          />
        </div>

        {/* Subject */}
        <Field
          id="subject"
          label="Subject"
          type="text"
          placeholder="Collaboration Inquiry"
          required
        />

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={5000}
            placeholder="Tell me about your project or inquiry..."
            className="w-full resize-y rounded-xl border border-border bg-white px-4 py-3 text-[14px] text-foreground outline-none transition-shadow placeholder:text-muted-light focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-70"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
          <SendIcon className="h-4 w-4" />
        </button>

        {status === "success" && (
          <div className="animate-fade-in space-y-2 rounded-xl bg-white/70 p-4 ring-1 ring-accent/20" role="status">
            <p className="font-serif text-[16px] font-medium text-foreground">
              Message Received
            </p>
            <p className="text-[13px] text-muted">
              Thank you for reaching out. I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        )}
        {status === "error" && (
          <p className="animate-fade-in text-[13px] text-red-600" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
};

function Field({ id, label, type, placeholder, required }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[14px] text-foreground outline-none transition-shadow placeholder:text-muted-light focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
