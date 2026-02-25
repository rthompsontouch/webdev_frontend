"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePortal } from "@/lib/context/PortalProvider";
import {
  getSubscriptions,
  getDocuments,
  getBillingPortalUrl,
  type RecurringSubscription,
  type Document,
} from "@/lib/api";

type PortalProject = {
  id: string;
  customerId: string;
  type: string;
  name: string;
  status: string;
  oneTimeCost?: number;
  paymentStatus?: string;
  manualPayments?: { amount: number; date: string; method?: string; notes?: string }[];
  unviewedUpdatesCount: number;
  createdAt: string;
  updatedAt: string;
};

function projectPhaseColor(status: string) {
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

export default function PortalPage() {
  const router = useRouter();
  const { customerId, isLoading } = usePortal();
  const [projects, setProjects] = useState<PortalProject[]>([]);
  const [subscriptions, setSubscriptions] = useState<RecurringSubscription[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingPortalLoading, setBillingPortalLoading] = useState(false);

  useEffect(() => {
    if (!customerId && !isLoading) {
      router.replace("/portal/login");
      return;
    }
    if (customerId) {
      Promise.all([
        fetch(`/api/portal/projects?customerId=${encodeURIComponent(customerId)}`).then((res) =>
          res.json()
        ),
        getSubscriptions({ customerId }),
        getDocuments(customerId),
      ])
        .then(([portalData, subs, docs]) => {
          const portalProjects = Array.isArray(portalData) ? portalData : [];
          setProjects(portalProjects);
          setSubscriptions(subs);
          setDocuments(docs);
        })
        .catch(() => {
          setProjects([]);
          setSubscriptions([]);
          setDocuments([]);
        })
        .finally(() => setLoading(false));
    }
  }, [customerId, isLoading, router]);

  const handleOpenBillingPortal = async () => {
    if (!customerId) return;
    setBillingPortalLoading(true);
    try {
      const { url } = await getBillingPortalUrl(
        customerId,
        typeof window !== "undefined" ? window.location.href : undefined
      );
      window.open(url, "_blank");
    } finally {
      setBillingPortalLoading(false);
    }
  };

  const hasBillingInfo =
    projects.some(
      (p: PortalProject) =>
        (p.oneTimeCost != null && p.oneTimeCost > 0) ||
        (p.manualPayments && p.manualPayments.length > 0) ||
        p.paymentStatus
    ) ||
    subscriptions.length > 0;

  if (isLoading || !customerId) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
      </div>
    );
  }

  const unpaidProjects = projects.filter(
    (p: PortalProject) =>
      ((p.oneTimeCost != null && p.oneTimeCost > 0) && p.paymentStatus !== "paid") ||
      subscriptions.some((s) => s.projectId === p.id && s.status !== "canceled")
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Overview</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Your projects, billing, and documents.
        </p>
      </div>

      {/* Billing overview */}
      {hasBillingInfo && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h2 className="text-lg font-medium text-white">Billing at a glance</h2>
          <div className="mt-4 space-y-4">
            {unpaidProjects.length > 0 && (
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                <p className="text-sm font-medium text-amber-400">
                  Payment attention needed
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {unpaidProjects.length} project{unpaidProjects.length > 1 ? "s" : ""}:{" "}
                  {unpaidProjects
                    .map((p: PortalProject) => p.name)
                    .join(", ")}
                  . View project for details.
                </p>
              </div>
            )}
            {subscriptions.length > 0 && (
              <div>
                <p className="text-sm text-zinc-400">Active recurring</p>
                <ul className="mt-2 space-y-1">
                  {subscriptions
                    .filter((s) => s.status !== "canceled")
                    .map((sub) => {
                      const total =
                        sub.amount ??
                        (sub.items?.reduce((s, i) => s + i.amount, 0) ?? 0);
                      const project = projects.find((p: PortalProject) => p.id === sub.projectId);
                      const displayName =
                        sub.items && sub.items.length > 1
                          ? sub.items.map((i) => i.productName).join(" + ")
                          : sub.productName ?? sub.items?.[0]?.productName ?? "Subscription";
                      return (
                        <li
                          key={sub.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-white">
                            {displayName}
                            {project && (
                              <span className="ml-1 text-zinc-500">
                                ({project.name})
                              </span>
                            )}
                          </span>
                          <span className="text-zinc-400">
                            ${total.toFixed(2)}/{sub.interval ?? "month"}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
            {subscriptions.length > 0 && (
              <button
                type="button"
                onClick={handleOpenBillingPortal}
                disabled={billingPortalLoading}
                className="cursor-pointer rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30 disabled:opacity-50"
              >
                {billingPortalLoading ? "Opening..." : "Manage billing & payment methods →"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Documents overview */}
      {documents.length > 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h2 className="text-lg font-medium text-white">Documents</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {documents.length} document{documents.length > 1 ? "s" : ""} shared with you
          </p>
          <ul className="mt-4 space-y-2">
            {documents.slice(0, 5).map((doc) => (
              <li key={doc.id}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300"
                >
                  {doc.name}
                  <span className="text-zinc-500">→</span>
                </a>
              </li>
            ))}
          </ul>
          {documents.length > 5 && (
            <p className="mt-2 text-xs text-zinc-500">
              +{documents.length - 5} more in project pages
            </p>
          )}
        </div>
      )}

      {/* Projects */}
      <div>
        <h2 className="text-lg font-medium text-white">Your Projects</h2>
        <p className="mt-1 text-sm text-zinc-500">
          View updates and provide feedback.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          Loading...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          No projects yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portal/projects/${project.id}`}
              className="relative flex cursor-pointer flex-col rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50"
            >
              {project.unviewedUpdatesCount > 0 && (
                <span className="absolute right-3 top-3 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                  New
                </span>
              )}
              <p className="font-medium text-white pr-16">{project.name}</p>
              <p className="mt-1 text-sm capitalize text-zinc-500">
                {project.type.replace("_", " ")}
              </p>
              <span
                className={`mt-3 w-fit rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${projectPhaseColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
