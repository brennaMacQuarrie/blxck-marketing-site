// Server-only: read this site's leads from the shared Supabase table (filtered to LEAD_CLIENT)
// and turn them into CSV. The service-role key is used here and never reaches the browser.

export type Lead = {
  created_at: string;
  name: string | null;
  email: string | null;
  details: Record<string, unknown>;
};

export async function fetchLeads(): Promise<Lead[]> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const client = process.env.LEAD_CLIENT;
  if (!url || !key || !client) return [];

  const q = new URL(url.replace(/\/+$/, "") + "/rest/v1/leads");
  q.searchParams.set("select", "created_at,name,email,details");
  q.searchParams.set("client", `eq.${client}`); // hardcoded to THIS site — can't see other clients
  q.searchParams.set("order", "created_at.desc");

  const r = await fetch(q, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" });
  if (!r.ok) { console.error("Supabase read error", r.status, await r.text()); return []; }
  return (await r.json()) as Lead[];
}

export function detailKeys(leads: Lead[]): string[] {
  const set = new Set<string>();
  for (const l of leads) for (const k of Object.keys(l.details || {})) set.add(k);
  return Array.from(set);
}

export function leadsToCsv(leads: Lead[]): string {
  const keys = detailKeys(leads);
  const headers = ["created_at", "name", "email", ...keys];
  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = leads.map((l) =>
    [l.created_at, l.name ?? "", l.email ?? "", ...keys.map((k) => l.details?.[k] ?? "")].map(esc).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

/**
 * Save a lead to the shared Supabase `leads` table, tagged with LEAD_CLIENT.
 * Returns false (and logs) when not configured or on error; never throws.
 */
export async function saveLead(lead: { name: string; email: string; details: Record<string, unknown> }): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const client = process.env.LEAD_CLIENT;
  if (!url || !key || !client) return false;
  try {
    const r = await fetch(url.replace(/\/+$/, "") + "/rest/v1/leads", {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ client, type: process.env.LEAD_TYPE || "enquiry", name: lead.name || null, email: lead.email, details: lead.details }),
    });
    if (!r.ok) { console.error("Supabase error", r.status, await r.text()); return false; }
    return true;
  } catch (e) {
    console.error("Supabase error", e);
    return false;
  }
}
