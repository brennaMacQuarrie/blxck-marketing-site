"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function LeadsLogin() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/leads/login", { method: "POST", body: new FormData(e.currentTarget) });
    if (res.ok) router.refresh();
    else setStatus("error");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-2xl border border-white/[0.1] bg-carbon/60 p-8">
      <h1 className="font-heading text-3xl font-normal text-hi">Leads</h1>
      <p className="text-sm text-mid">Enter the password to view and download enquiries.</p>
      {status === "error" && (
        <p role="alert" className="text-sm text-lavender">Incorrect password.</p>
      )}
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        placeholder="Password"
        aria-label="Password"
        className="w-full rounded-xl border border-white/[0.1] bg-white/[0.02] px-4 py-3 text-sm text-hi placeholder:text-lo focus:border-teal/60 focus:outline-none"
      />
      <button
        disabled={status === "sending"}
        className="rounded-full bg-hi px-5 py-3 text-sm font-semibold text-ink disabled:opacity-60"
      >
        {status === "sending" ? "Checking…" : "View leads"}
      </button>
    </form>
  );
}
