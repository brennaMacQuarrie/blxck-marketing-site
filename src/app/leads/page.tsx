import type { Metadata } from "next";
import { isAuthed } from "@/lib/leads-auth";
import { fetchLeads, detailKeys } from "@/lib/leads";
import { LeadsLogin } from "@/components/leads/LeadsLogin";

export const metadata: Metadata = { title: "Leads", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

/** Password-protected list of contact form enquiries (from the shared Supabase table). */
export default async function LeadsPage() {
  if (!(await isAuthed())) {
    return (
      <section className="mx-auto flex min-h-[80vh] w-full max-w-sm flex-col justify-center px-(--spacing-gutter) pt-32 pb-20">
        <LeadsLogin />
      </section>
    );
  }

  const leads = await fetchLeads();
  const keys = detailKeys(leads).filter((k) => k !== "source");

  return (
    <section className="mx-auto w-full max-w-6xl px-(--spacing-gutter) pt-32 pb-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-4xl font-normal text-hi">
          Leads <span className="text-lo">({leads.length})</span>
        </h1>
        <div className="flex gap-3">
          <a href="/api/leads/export" className="rounded-full bg-hi px-5 py-2.5 text-sm font-semibold text-ink">
            Download CSV
          </a>
          <form action="/api/leads/logout" method="post">
            <button className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-hi">
              Log out
            </button>
          </form>
        </div>
      </div>

      {leads.length === 0 ? (
        <p className="text-mid">No enquiries yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-lo">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                {keys.map((k) => (
                  <th key={k} className="px-4 py-3">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l, i) => (
                <tr key={i} className="border-t border-white/[0.06] align-top text-mid">
                  <td className="whitespace-nowrap px-4 py-3 text-lo">
                    {new Date(l.created_at).toLocaleString("en-CA", { timeZone: "America/Edmonton" })}
                  </td>
                  <td className="px-4 py-3 text-hi">{l.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${l.email}`} className="hover:text-hi hover:underline">{l.email}</a>
                  </td>
                  {keys.map((k) => (
                    <td key={k} className="max-w-md px-4 py-3">{String(l.details?.[k] ?? "")}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
