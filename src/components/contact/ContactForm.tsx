"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

const field =
  "w-full rounded-xl border border-white/[0.1] bg-white/[0.02] px-4 py-3 text-sm text-hi placeholder:text-lo transition-colors focus:border-teal/60 focus:outline-none";

const interests = [
  "Not sure yet",
  "Strategy & Consulting",
  "Advertising / Paid Media",
  "Content & Creative",
  "Web & SEO",
  "Medical Marketing",
  "Marketing Audit",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else if (res.status === 503) {
        setStatus("unconfigured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-teal/30 bg-carbon/60 p-8">
        <span className="text-teal text-glow glow-teal">✓ Message sent</span>
        <p className="text-mid">
          Thanks — we&apos;ll be in touch within one business day. For anything
          urgent, call{" "}
          <a href={`tel:${site.contact.phone}`} className="text-hi hover:underline">
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
        <Button variant="ghost" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs uppercase tracking-wider text-lo">
            Name *
          </label>
          <input id="name" name="name" required className={field} placeholder="Jane Doe" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs uppercase tracking-wider text-lo">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={field}
            placeholder="jane@clinic.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-xs uppercase tracking-wider text-lo">
            Company
          </label>
          <input id="company" name="company" className={field} placeholder="Business name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="interest" className="text-xs uppercase tracking-wider text-lo">
            Interested in
          </label>
          <select id="interest" name="interest" className={field} defaultValue="Not sure yet">
            {interests.map((i) => (
              <option key={i} value={i} className="bg-carbon text-hi">
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs uppercase tracking-wider text-lo">
          What can we help with? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${field} resize-none`}
          placeholder="Tell us a bit about your business and your goals…"
        />
      </div>

      {/* Honeypot (hidden from humans) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="mt-2 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="primary" withArrow disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>

        {status === "error" && (
          <span className="text-sm text-lavender">
            Something went wrong. Email{" "}
            <a href={`mailto:${site.contact.email}`} className="underline">
              {site.contact.email}
            </a>
            .
          </span>
        )}
        {status === "unconfigured" && (
          <span className="text-sm text-lo">
            Form isn&apos;t live yet — email{" "}
            <a href={`mailto:${site.contact.email}`} className="text-mid underline">
              {site.contact.email}
            </a>{" "}
            for now.
          </span>
        )}
      </div>
    </form>
  );
}
