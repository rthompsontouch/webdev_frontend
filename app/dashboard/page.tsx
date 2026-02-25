"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  getLeads,
  getCustomers,
  getProjects,
  getPaymentStats,
  type Lead,
  type Project,
  type PaymentStats,
} from "@/lib/api";

function formatDate(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 3600000) return "Just now";
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
  return date.toLocaleDateString();
}

function projectStatusColor(status: string) {
  const colors: Record<string, string> = {
    discovery: "bg-blue-500/20 text-blue-400",
    design: "bg-amber-500/20 text-amber-400",
    development: "bg-emerald-500/20 text-emerald-400",
    review: "bg-purple-500/20 text-purple-400",
    launch: "bg-rose-500/20 text-rose-400",
    complete: "bg-zinc-500/20 text-zinc-400",
  };
  return colors[status] ?? "bg-zinc-500/20 text-zinc-400";
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [customers, setCustomers] = useState<{ id: string }[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [paymentStats, setPaymentStats] = useState<PaymentStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    Promise.all([getLeads(), getCustomers(), getProjects(), getPaymentStats()])
      .then(([l, c, p, stats]) => {
        setLeads(l);
        setCustomers(c);
        setProjects(p);
        setPaymentStats(stats);
      })
      .catch(() => setPaymentStats(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const newLeads = leads.filter((l) => l.status === "new");
  const activeProjects = projects.filter((p) => p.status !== "complete");
  const paymentIssueCount =
    paymentStats
      ? paymentStats.lateSubscriptions.length +
        paymentStats.pendingSubscriptions.length +
        paymentStats.unpaidProjects.length
      : 0;
  const recentLeads = [...leads].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Overview</h1>
          <p className="mt-1 text-zinc-400">
            Your leads, customers, and projects at a glance.
          </p>
        </div>
        <button
          type="button"
          onClick={() => fetchData()}
          disabled={loading}
          className="shrink-0 rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Link
          href="/dashboard/leads"
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-rose-500/30 hover:bg-zinc-900"
        >
          <p className="text-sm font-medium text-zinc-400">Leads</p>
          <p className="mt-2 text-2xl font-semibold text-white">{leads.length}</p>
          <p className="mt-1 text-xs text-zinc-500">
            {newLeads.length} new to review
          </p>
        </Link>
        <Link
          href="/dashboard/leads?status=new"
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-amber-500/30 hover:bg-zinc-900"
        >
          <p className="text-sm font-medium text-zinc-400">New Leads</p>
          <p className="mt-2 text-2xl font-semibold text-amber-400">
            {newLeads.length}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Need your attention</p>
        </Link>
        <Link
          href="/dashboard/customers"
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-rose-500/30 hover:bg-zinc-900"
        >
          <p className="text-sm font-medium text-zinc-400">Customers</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {customers.length}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Active clients</p>
        </Link>
        <Link
          href="/dashboard/projects"
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-rose-500/30 hover:bg-zinc-900"
        >
          <p className="text-sm font-medium text-zinc-400">Active Projects</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {activeProjects.length}
          </p>
          <p className="mt-1 text-xs text-zinc-500">In progress</p>
        </Link>
        <Link
          href="#payment-issues"
          className={`rounded-xl border p-6 transition-colors ${
            paymentIssueCount > 0
              ? "border-rose-500/30 bg-rose-500/10 hover:border-rose-500/50 hover:bg-rose-500/20"
              : "border-zinc-800 bg-zinc-900/50 hover:border-rose-500/30 hover:bg-zinc-900"
          }`}
        >
          <p className="text-sm font-medium text-zinc-400">Payment issues</p>
          <p className={`mt-2 text-2xl font-semibold ${paymentIssueCount > 0 ? "text-rose-400" : "text-white"}`}>
            {paymentStats === null ? "—" : paymentIssueCount}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {paymentIssueCount > 0 ? "Need your attention" : "All caught up"}
          </p>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Leads */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30">
          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
            <h2 className="font-semibold text-white">Recent Leads</h2>
            <Link
              href="/dashboard/leads"
              className="text-sm font-medium text-rose-400 hover:text-rose-300"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-zinc-800">
            {recentLeads.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-zinc-500">
                No leads yet.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/dashboard/leads/${lead.id}`}
                  className="block px-6 py-4 transition-colors hover:bg-zinc-800/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{lead.name}</p>
                      <p className="text-sm text-zinc-500">{lead.company}</p>
                      <p className="mt-1 text-sm text-zinc-400 line-clamp-1">
                        {lead.project}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          lead.status === "new"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-zinc-700 text-zinc-400"
                        }`}
                      >
                        {lead.status.replace("_", " ")}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {formatDate(lead.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Active Projects */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30">
          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
            <h2 className="font-semibold text-white">Active Projects</h2>
            <Link
              href="/dashboard/projects"
              className="text-sm font-medium text-rose-400 hover:text-rose-300"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-zinc-800">
            {activeProjects.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-zinc-500">
                No active projects.
              </div>
            ) : (
              activeProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="block px-6 py-4 transition-colors hover:bg-zinc-800/50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{project.name}</p>
                      <p className="text-sm capitalize text-zinc-500">
                        {project.type.replace("_", " ")}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${projectStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Payment issues */}
      <div id="payment-issues" className="rounded-xl border border-zinc-800 bg-zinc-900/30">
        <div className="border-b border-zinc-800 px-6 py-4">
          <h2 className="font-semibold text-white">Payment issues</h2>
          <p className="mt-1 text-sm text-zinc-400">
            {paymentStats === null
              ? "Loading..."
              : paymentIssueCount > 0
                ? `${paymentIssueCount} to address — late payments, pending setup, or unpaid invoices`
                : "All caught up — no late payments or unpaid invoices"}
          </p>
        </div>
          <div className="divide-y divide-zinc-800">
            {!paymentStats ? (
              <div className="px-6 py-12 text-center text-sm text-zinc-500">
                Loading payment stats...
              </div>
            ) : paymentIssueCount === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-zinc-500">
                No payment issues to address.
              </div>
            ) : (
              <>
            {paymentStats.lateSubscriptions.map((sub) => (
              <Link
                key={`late-${sub.id}`}
                href={`/dashboard/projects/${sub.projectId}`}
                className="block px-6 py-4 transition-colors hover:bg-rose-500/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">{sub.customerName}</p>
                    <p className="text-sm text-zinc-400">
                      {sub.projectName} · {sub.productName}
                      {sub.amount != null && sub.interval && ` · $${(sub.amount / 100).toFixed(0)}/${sub.interval}`}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-rose-500/30 px-2.5 py-0.5 text-xs font-medium text-rose-400">
                    Late payment
                  </span>
                </div>
              </Link>
            ))}
            {paymentStats.pendingSubscriptions.map((sub) => (
              <Link
                key={`pending-${sub.id}`}
                href={`/dashboard/projects/${sub.projectId}`}
                className="block px-6 py-4 transition-colors hover:bg-rose-500/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">{sub.customerName}</p>
                    <p className="text-sm text-zinc-400">
                      {sub.projectName} · {sub.productName}
                      {sub.amount != null && sub.interval && ` · $${(sub.amount / 100).toFixed(0)}/${sub.interval}`}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                    Pending payment
                  </span>
                </div>
              </Link>
            ))}
            {paymentStats.unpaidProjects.map((proj) => (
              <Link
                key={`unpaid-${proj.id}`}
                href={`/dashboard/projects/${proj.id}`}
                className="block px-6 py-4 transition-colors hover:bg-rose-500/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">{proj.customerName}</p>
                    <p className="text-sm text-zinc-400">
                      {proj.projectName}
                      {proj.oneTimeCost != null && proj.oneTimeCost > 0 && ` · $${proj.oneTimeCost.toFixed(2)} due`}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                    {proj.paymentStatus === "partially_paid" ? "Partially paid" : "Unpaid"}
                  </span>
                </div>
              </Link>
            ))}
              </>
            )}
          </div>
        </div>

      {/* New leads CTA */}
      {newLeads.length > 0 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-amber-400">
                {newLeads.length} new lead{newLeads.length > 1 ? "s" : ""} need
                your attention
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Review and convert or flag as not interested.
              </p>
            </div>
            <Link
              href="/dashboard/leads?status=new"
              className="shrink-0 rounded-lg bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/30"
            >
              Review leads
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
