"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getLeads, type Lead, type LeadStatus } from "@/lib/api";

export default function LeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") as LeadStatus | null;
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">(() => {
    if (statusParam && ["new", "contacted", "converted", "not_interested"].includes(statusParam)) {
      return statusParam;
    }
    return "all";
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    getLeads(filter === "all" ? undefined : filter)
      .then(setLeads)
      .finally(() => setLoading(false));
  }, [filter]);

  const filteredLeads = leads.filter((lead) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    const fields = [
      lead.name,
      lead.email,
      lead.company,
      lead.interested,
      lead.project,
      lead.phone,
    ].filter(Boolean) as string[];
    return fields.some((f) => f.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-white">Leads</h1>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50 sm:w-56"
          />
          <div className="flex gap-2">
          {(["all", "new", "contacted", "converted", "not_interested"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                  filter === status
                    ? "bg-rose-500/20 text-rose-400"
                    : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                }`}
              >
                {status.replace("_", " ")}
              </button>
            )
          )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          Loading leads...
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          {search.trim() ? "No leads match your search." : "No leads found."}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Interested
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="group border-b border-zinc-800/50 transition-colors hover:bg-zinc-900/30"
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && router.push(`/dashboard/leads/${lead.id}`)
                  }
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-white group-hover:text-rose-400">
                      {lead.name}
                    </p>
                    <p className="text-sm text-zinc-500">{lead.email}</p>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{lead.phone ?? "—"}</td>
                  <td className="px-6 py-4 text-zinc-300">{lead.company}</td>
                  <td className="px-6 py-4 text-zinc-300">{lead.interested}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium capitalize text-zinc-300">
                      {lead.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
