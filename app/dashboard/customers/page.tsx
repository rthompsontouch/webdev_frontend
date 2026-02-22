"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCustomers, type Customer } from "@/lib/api";

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    getCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    const fields = [
      customer.name,
      customer.email,
      customer.company,
      customer.phone,
      customer.notes,
    ].filter(Boolean) as string[];
    return fields.some((f) => f.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-white">Customers</h1>
        <input
          type="search"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50 sm:w-56"
        />
      </div>

      {loading ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          Loading customers...
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          {search.trim() ? "No customers match your search." : "No customers found."}
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
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="group border-b border-zinc-800/50 transition-colors hover:bg-zinc-900/30"
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && router.push(`/dashboard/customers/${customer.id}`)
                  }
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-white group-hover:text-rose-400">
                      {customer.name}
                    </p>
                    <p className="text-sm text-zinc-500">{customer.email}</p>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{customer.phone ?? "—"}</td>
                  <td className="px-6 py-4 text-zinc-300">{customer.company ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
