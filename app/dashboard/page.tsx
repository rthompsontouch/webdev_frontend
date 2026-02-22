"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getLeads,
  getCustomers,
  getProjects,
  type Lead,
  type Project,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getLeads(), getCustomers(), getProjects()])
      .then(([l, c, p]) => {
        setLeads(l);
        setCustomers(c);
        setProjects(p);
      })
      .finally(() => setLoading(false));
  }, []);

  const newLeads = leads.filter((l) => l.status === "new");
  const activeProjects = projects.filter((p) => p.status !== "complete");
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
      <div>
        <h1 className="text-2xl font-semibold text-white">Overview</h1>
        <p className="mt-1 text-zinc-400">
          Your leads, customers, and projects at a glance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
