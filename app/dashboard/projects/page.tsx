"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProjects, getCustomer, type Project, type Customer } from "@/lib/api";

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [customers, setCustomers] = useState<Record<string, Customer>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProjects()
      .then(async (projects) => {
        setProjects(projects);
        const customerIds = [...new Set(projects.map((p) => p.customerId))];
        const customerMap: Record<string, Customer> = {};
        await Promise.all(
          customerIds.map(async (id) => {
            const c = await getCustomer(id);
            if (c) customerMap[id] = c;
          })
        );
        setCustomers(customerMap);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    const customer = customers[project.customerId];
    const customerName = customer?.name ?? "";
    const fields = [
      project.name,
      project.type,
      project.status,
      customerName,
    ].filter(Boolean);
    return fields.some((f) => f.toLowerCase().includes(q));
  });

  const statusColors: Record<string, string> = {
    discovery: "bg-blue-500/20 text-blue-400",
    design: "bg-amber-500/20 text-amber-400",
    development: "bg-emerald-500/20 text-emerald-400",
    review: "bg-purple-500/20 text-purple-400",
    launch: "bg-rose-500/20 text-rose-400",
    complete: "bg-zinc-500/20 text-zinc-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-white">Projects</h1>
        <input
          type="search"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50 sm:w-56"
        />
      </div>

      {loading ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          Loading projects...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          {search.trim() ? "No projects match your search." : "No projects yet."}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="group border-b border-zinc-800/50 transition-colors hover:bg-zinc-900/30"
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/dashboard/projects/${project.id}`)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && router.push(`/dashboard/projects/${project.id}`)
                  }
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-white group-hover:text-rose-400">
                      {project.name}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">
                    {customers[project.customerId]?.name ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-zinc-300 capitalize">
                    {project.type.replace("_", " ")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        statusColors[project.status] ?? "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {project.status}
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
