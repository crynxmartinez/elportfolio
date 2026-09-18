"use client";

import { useState } from "react";

const SERVICES = [
  "Website design",
  "SEO & competitor research",
  "GHL systems & automation",
  "Not sure yet",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $6,000",
  "$6,000+",
  "Prefer to discuss",
];

const WHATSAPP = "https://wa.me/639152168012";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        return;
      }

      const body = await res.json().catch(() => ({}));
      setStatus("error");
      setError(
        body?.error === "config" || body?.error === "upstream"
          ? "Something went wrong on my end, not yours."
          : body?.error ??
              "Please check your name, email and message, then try again."
      );
    } catch {
      setStatus("error");
      setError("Something went wrong on my end, not yours.");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="mt-14 rounded-2xl border border-teal-300/20 bg-teal-300/[0.04] p-8"
      >
        <h2 className="font-display text-2xl">Got it — thank you.</h2>
        <p className="mt-3 text-neutral-400">
          I read every enquiry myself and usually reply within one working day.
          If it is urgent, WhatsApp is faster:{" "}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-200 underline underline-offset-4 hover:text-teal-300"
          >
            +63 915 216 8012
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-14 grid gap-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          required
          autoComplete="name"
          placeholder="Raphael Martinez"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Current website"
          name="website"
          hint="Optional — paste it if you have one"
          placeholder="yourbusiness.com"
        />
        <Field
          label="WhatsApp"
          name="whatsapp"
          hint="Optional"
          autoComplete="tel"
          placeholder="+63 900 000 0000"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Select label="What do you need?" name="service" options={SERVICES} />
        <Select
          label="Approximate budget"
          name="budget"
          hint="Optional — helps me suggest a realistic scope"
          options={BUDGETS}
        />
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-neutral-200">
          What would you like to improve?{" "}
          <span aria-hidden="true" className="text-teal-300/80">
            *
          </span>
        </span>
        <span className="text-xs text-neutral-500">
          What is getting in the way right now, and what you want to build next.
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Our site looks fine but nobody enquires through it…"
          className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-neutral-100 placeholder:text-neutral-600 focus:border-teal-300/40 focus:outline-none focus:ring-1 focus:ring-teal-300/30"
        />
      </label>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}{" "}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Message me on WhatsApp instead
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="button button-dark disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send project details ↗"}
        </button>
        <span className="text-xs text-neutral-500">
          No newsletter, no automated sales sequence.
        </span>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  hint,
  required,
  type = "text",
  ...rest
}: {
  label: string;
  name: string;
  hint?: string;
  required?: boolean;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-neutral-200">
        {label}{" "}
        {required && (
          <span aria-hidden="true" className="text-teal-300/80">
            *
          </span>
        )}
      </span>
      {hint && <span className="text-xs text-neutral-500">{hint}</span>}
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-neutral-100 placeholder:text-neutral-600 focus:border-teal-300/40 focus:outline-none focus:ring-1 focus:ring-teal-300/30"
        {...rest}
      />
    </label>
  );
}

function Select({
  label,
  name,
  hint,
  options,
}: {
  label: string;
  name: string;
  hint?: string;
  options: string[];
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-neutral-200">{label}</span>
      {hint && <span className="text-xs text-neutral-500">{hint}</span>}
      <select
        name={name}
        defaultValue=""
        className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-neutral-100 focus:border-teal-300/40 focus:outline-none focus:ring-1 focus:ring-teal-300/30"
      >
        <option value="" className="bg-neutral-900">
          Select one
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-neutral-900">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
