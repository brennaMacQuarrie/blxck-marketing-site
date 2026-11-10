import { isAuthed } from "@/lib/leads-auth";
import { fetchLeads, leadsToCsv } from "@/lib/leads";

export async function GET() {
  if (!(await isAuthed())) return new Response("Unauthorized", { status: 401 });

  const csv = leadsToCsv(await fetchLeads());
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
