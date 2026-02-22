"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getLead,
  updateLeadStatus,
  convertLeadToCustomer,
  type Lead,
  type LeadStatus,
} from "@/lib/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function statusColor(status: LeadStatus) {
  const colors: Record<LeadStatus, string> = {
    new: "bg-amber-500/20 text-amber-400",
    contacted: "bg-blue-500/20 text-blue-400",
    converted: "bg-emerald-500/20 text-emerald-400",
    not_interested: "bg-zinc-600/50 text-zinc-400",
  };
  return colors[status];
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLead(id)
      .then((l) => {
        setLead(l ?? null);
        setNotes(l?.notes ?? "");
      })
      .catch(() => setError("Failed to load lead"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (status: LeadStatus) => {
    if (!lead) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateLeadStatus(lead.id, status, notes || undefined);
      setLead(updated);
    } catch {
      setError("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  const handleConvert = async () => {
    if (!lead) return;
    setSaving(true);
    setError(null);
    try {
      const { customerId } = await convertLeadToCustomer(lead.id);
      setLead((prev) => (prev ? { ...prev, status: "converted" as const } : null));
      router.push(`/dashboard/customers?highlight=${customerId}`);
    } catch {
      setError("Failed to convert lead");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!lead) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateLeadStatus(lead.id, lead.status, notes || undefined);
      setLead(updated);
    } catch {
      setError("Failed to save notes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
      </div>
    );
  }

  if (error && !lead) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/leads"
          className="text-sm text-rose-400 hover:text-rose-300"
        >
          ← Back to leads
        </Link>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          {error}
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/leads"
          className="text-sm text-rose-400 hover:text-rose-300"
        >
          ← Back to leads
        </Link>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          Lead not found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/dashboard/leads"
          className="text-sm text-rose-400 hover:text-rose-300"
        >
          ← Back to leads
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30">
        <div className="border-b border-zinc-800 px-6 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">{lead.name}</h1>
              <p className="mt-1 text-zinc-400">{lead.company}</p>
              <p className="mt-2 text-sm text-zinc-500">{lead.email}</p>
              {lead.phone && (
                <p className="mt-1 text-sm text-zinc-500">{lead.phone}</p>
              )}
              <p className="mt-2 text-xs text-zinc-500">
                Added {formatDate(lead.createdAt)}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium capitalize ${statusColor(
                lead.status
              )}`}
            >
              {lead.status.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Interested in
            </h3>
            <p className="mt-1 text-white">{lead.interested}</p>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Project description
            </h3>
            <p className="mt-1 text-zinc-300">{lead.project}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleSaveNotes}
              placeholder="Add internal notes..."
              rows={4}
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {lead.status !== "contacted" && (
              <button
                onClick={() => handleStatusChange("contacted")}
                disabled={saving}
                className="rounded-lg bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/30 disabled:opacity-50"
              >
                Mark contacted
              </button>
            )}
            {lead.status !== "converted" && (
              <button
                onClick={handleConvert}
                disabled={saving}
                className="rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/30 disabled:opacity-50"
              >
                Convert to customer
              </button>
            )}
            {lead.status !== "not_interested" && (
              <button
                onClick={() => handleStatusChange("not_interested")}
                disabled={saving}
                className="rounded-lg bg-zinc-700/50 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-700 disabled:opacity-50"
              >
                Not interested
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
