"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  getProject,
  getCustomer,
  getProjectUpdates,
  getUpdate,
  getUpdateFeedback,
  createProjectUpdate,
  replyToFeedback,
  updateProjectStatus,
  updateProject,
  getDocuments,
  uploadDocument,
  deleteDocument,
  getStripeProducts,
  getSubscriptions,
  createSubscription,
  cancelSubscription,
  markSubscriptionPaid,
  getBillingPortalUrl,
  type Project,
  type ProjectStatus,
  type ProjectUpdate,
  type ProjectUpdateFeedback,
  type Document,
  type RecurringSubscription,
  type StripeProduct,
} from "@/lib/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function statusColor(status: ProjectStatus) {
  const colors: Record<ProjectStatus, string> = {
    discovery: "bg-blue-500/20 text-blue-400",
    design: "bg-amber-500/20 text-amber-400",
    development: "bg-emerald-500/20 text-emerald-400",
    review: "bg-purple-500/20 text-purple-400",
    launch: "bg-rose-500/20 text-rose-400",
    complete: "bg-zinc-500/20 text-zinc-400",
  };
  return colors[status];
}

const STATUS_OPTIONS: ProjectStatus[] = [
  "discovery",
  "design",
  "development",
  "review",
  "launch",
  "complete",
];

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [customer, setCustomer] = useState<{ id: string; name: string } | null>(null);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImages, setNewImages] = useState<string[]>([]);

  const [selectedUpdate, setSelectedUpdate] = useState<ProjectUpdate | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<ProjectUpdateFeedback | null>(null);
  const [replyText, setReplyText] = useState("");

  const [showManualPaymentForm, setShowManualPaymentForm] = useState(false);
  const [manualAmount, setManualAmount] = useState("");
  const [manualDate, setManualDate] = useState(new Date().toISOString().slice(0, 10));
  const [manualMethod, setManualMethod] = useState("");
  const [manualNotes, setManualNotes] = useState("");

  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [docUploading, setDocUploading] = useState(false);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docName, setDocName] = useState("");
  const [oneTimeCostInput, setOneTimeCostInput] = useState("");
  const [subscriptions, setSubscriptions] = useState<RecurringSubscription[]>([]);
  const [showAddRecurring, setShowAddRecurring] = useState(false);
  const [stripeProducts, setStripeProducts] = useState<StripeProduct[]>([]);
  const [selectedPriceIds, setSelectedPriceIds] = useState<string[]>([]);
  const [billingDay, setBillingDay] = useState(1);
  const [firstPaymentDate, setFirstPaymentDate] = useState("");
  const [subCreating, setSubCreating] = useState(false);
  const [cancelingSubId, setCancelingSubId] = useState<string | null>(null);
  const [markingPaidSubId, setMarkingPaidSubId] = useState<string | null>(null);

  useEffect(() => {
    getProject(id)
      .then(async (p) => {
        setProject(p ?? null);
        if (p) {
          const [c, u] = await Promise.all([
            getCustomer(p.customerId),
            getProjectUpdates(p.id),
          ]);
          if (c) setCustomer({ id: c.id, name: c.name });
          setUpdates(u);
        }
      })
      .catch(() => setError("Failed to load project"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!selectedUpdate) {
      setSelectedFeedback(null);
      setReplyText("");
      return;
    }
    getUpdateFeedback(selectedUpdate.id)
      .then((f) => {
        setSelectedFeedback(f ?? null);
        setReplyText(f?.reply ?? "");
      })
      .catch(() => setSelectedFeedback(null));
  }, [selectedUpdate?.id]);

  useEffect(() => {
    if (!project?.customerId) return;
    setDocumentsLoading(true);
    getDocuments(project.customerId, project.id)
      .then(setDocuments)
      .catch(() => setDocuments([]))
      .finally(() => setDocumentsLoading(false));
  }, [project?.id, project?.customerId]);

  useEffect(() => {
    setOneTimeCostInput(String(project?.oneTimeCost ?? 0));
  }, [project?.oneTimeCost]);

  useEffect(() => {
    if (!project?.id) return;
    getSubscriptions({ projectId: project.id })
      .then(setSubscriptions)
      .catch(() => setSubscriptions([]));
  }, [project?.id]);

  useEffect(() => {
    if (showAddRecurring) {
      getStripeProducts()
        .then(setStripeProducts)
        .catch(() => setStripeProducts([]));
    }
  }, [showAddRecurring]);

  const handleStatusChange = async (status: ProjectStatus) => {
    if (!project) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateProjectStatus(project.id, status);
      setProject(updated);
    } catch {
      setError("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  const handleBillingUpdate = async (data: {
    oneTimeCost?: number;
    paymentStatus?: "unpaid" | "partially_paid" | "paid";
  }) => {
    if (!project) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateProject(project.id, data);
      setProject(updated);
    } catch {
      setError("Failed to update billing");
    } finally {
      setSaving(false);
    }
  };

  const handleManualPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !manualAmount || parseFloat(manualAmount) <= 0) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateProject(project.id, {
        manualPayment: {
          amount: parseFloat(manualAmount),
          date: manualDate || undefined,
          method: manualMethod.trim() || undefined,
          notes: manualNotes.trim() || undefined,
        },
      });
      setProject(updated);
      setManualAmount("");
      setManualDate(new Date().toISOString().slice(0, 10));
      setManualMethod("");
      setManualNotes("");
      setShowManualPaymentForm(false);
    } catch {
      setError("Failed to add payment");
    } finally {
      setSaving(false);
    }
  };

  const handleDocUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !docFile) return;
    setDocUploading(true);
    setError(null);
    try {
      const doc = await uploadDocument(docFile, {
        customerId: project.customerId,
        projectId: project.id,
        name: docName.trim() || docFile.name,
        type: "contract",
      });
      setDocuments((prev) => [doc, ...prev]);
      setDocFile(null);
      setDocName("");
    } catch {
      setError("Failed to upload document");
    } finally {
      setDocUploading(false);
    }
  };

  const handleDocDelete = async (docId: string) => {
    if (!confirm("Delete this document?")) return;
    try {
      await deleteDocument(docId);
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    } catch {
      setError("Failed to delete document");
    }
  };

  const handleCreateSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || selectedPriceIds.length === 0) return;
    setSubCreating(true);
    setError(null);
    try {
      const sub = await createSubscription({
        projectId: project.id,
        priceIds: selectedPriceIds,
        billingDay,
        firstPaymentDate: firstPaymentDate || undefined,
      });
      setSubscriptions((prev) => [sub, ...prev]);
      setShowAddRecurring(false);
      setSelectedPriceIds([]);
      setBillingDay(1);
      setFirstPaymentDate("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create subscription");
    } finally {
      setSubCreating(false);
    }
  };

  const togglePriceSelection = (priceId: string) => {
    setSelectedPriceIds((prev) =>
      prev.includes(priceId) ? prev.filter((p) => p !== priceId) : [...prev, priceId]
    );
  };

  const handleMarkSubscriptionPaid = async (subId: string) => {
    if (!confirm("Mark this subscription as paid? (Customer paid you directly – check, wire, etc.)")) return;
    setMarkingPaidSubId(subId);
    setError(null);
    try {
      const updated = await markSubscriptionPaid(subId);
      setSubscriptions((prev) => prev.map((s) => (s.id === subId ? updated : s)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark as paid");
    } finally {
      setMarkingPaidSubId(null);
    }
  };

  const handleCancelSubscription = async (subId: string, immediately = false) => {
    if (!confirm(immediately ? "Cancel immediately? The customer won't have access for the rest of the period." : "Cancel at end of billing period? The customer keeps access until then.")) return;
    setCancelingSubId(subId);
    setError(null);
    try {
      const updated = await cancelSubscription(subId, { immediately });
      setSubscriptions((prev) =>
        immediately ? prev.filter((s) => s.id !== subId) : prev.map((s) => (s.id === subId ? updated : s))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel subscription");
    } finally {
      setCancelingSubId(null);
    }
  };

  const handleOpenBillingPortal = async () => {
    if (!project?.customerId) return;
    try {
      const { url } = await getBillingPortalUrl(
        project.customerId,
        typeof window !== "undefined" ? window.location.href : undefined
      );
      window.open(url, "_blank");
    } catch {
      setError("Failed to open billing portal. Customer may need a Stripe account first.");
    }
  };

  const handleImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const readers = imageFiles.map((file) =>
      new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      })
    );
    Promise.all(readers).then((urls) => {
      setNewImages((prev) => [...prev, ...urls]);
    });
    e.target.value = "";
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !newTitle.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const update = await createProjectUpdate(project.id, {
        title: newTitle.trim(),
        description: newDescription.trim(),
        images: newImages.length > 0 ? newImages : undefined,
      });
      setUpdates((prev) => [update, ...prev]);
      setNewTitle("");
      setNewDescription("");
      setNewImages([]);
      setShowCreateModal(false);
    } catch {
      setError("Failed to create update");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveReply = async () => {
    if (!selectedUpdate) return;
    setSaving(true);
    setError(null);
    try {
      const feedback = await replyToFeedback(selectedUpdate.id, replyText);
      setSelectedFeedback(feedback);
    } catch {
      setError("Failed to save reply");
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

  if (error && !project) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/projects"
          className="text-sm text-rose-400 hover:text-rose-300"
        >
          ← Back to projects
        </Link>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          {error}
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/projects"
          className="text-sm text-rose-400 hover:text-rose-300"
        >
          ← Back to projects
        </Link>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          Project not found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/projects"
        className="text-sm text-rose-400 hover:text-rose-300"
      >
        ← Back to projects
      </Link>

      {error && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30">
        <div className="border-b border-zinc-800 px-6 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">{project.name}</h1>
              <p className="mt-1 capitalize text-zinc-400">
                {project.type.replace("_", " ")}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Created {formatDate(project.createdAt)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Updated {formatDate(project.updatedAt)}
              </p>
              {customer && (
                <Link
                  href={`/dashboard/customers/${customer.id}`}
                  className="mt-2 inline-block text-sm text-rose-400 hover:text-rose-300"
                >
                  View customer: {customer.name} →
                </Link>
              )}
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium capitalize ${statusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Project phase
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={saving || project.status === status}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors disabled:opacity-50 ${
                    project.status === status
                      ? statusColor(status)
                      : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Billing section */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Billing
            </h3>
            <div className="mt-4 space-y-4 rounded-lg border border-zinc-800 bg-zinc-800/30 p-4">
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400">
                    One-time cost ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={oneTimeCostInput}
                    onChange={(e) => setOneTimeCostInput(e.target.value)}
                    onBlur={() => {
                      const v = parseFloat(oneTimeCostInput);
                      if (!isNaN(v) && v >= 0 && v !== (project?.oneTimeCost ?? 0)) {
                        handleBillingUpdate({ oneTimeCost: v });
                      }
                    }}
                    className="mt-1 w-32 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-400">Status:</span>
                  <select
                    value={project.paymentStatus ?? "unpaid"}
                    onChange={(e) =>
                      handleBillingUpdate({
                        paymentStatus: e.target.value as "unpaid" | "partially_paid" | "paid",
                      })
                    }
                    disabled={saving}
                    className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="partially_paid">Partially paid</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => setShowManualPaymentForm(!showManualPaymentForm)}
                  className="rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30"
                >
                  {showManualPaymentForm ? "Cancel" : "Mark payment received"}
                </button>
              </div>
              {showManualPaymentForm && (
                <form onSubmit={handleManualPayment} className="mt-4 space-y-3 border-t border-zinc-700 pt-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-zinc-400">Amount ($)</label>
                      <input
                        type="number"
                        min={0.01}
                        step={0.01}
                        value={manualAmount}
                        onChange={(e) => setManualAmount(e.target.value)}
                        required
                        className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-400">Date</label>
                      <input
                        type="date"
                        value={manualDate}
                        onChange={(e) => setManualDate(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400">Method (check, wire, cash, etc.)</label>
                    <input
                      type="text"
                      value={manualMethod}
                      onChange={(e) => setManualMethod(e.target.value)}
                      placeholder="e.g. Check"
                      className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400">Notes</label>
                    <input
                      type="text"
                      value={manualNotes}
                      onChange={(e) => setManualNotes(e.target.value)}
                      placeholder="Optional"
                      className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saving || !manualAmount || parseFloat(manualAmount) <= 0}
                    className="rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30 disabled:opacity-50"
                  >
                    {saving ? "Adding..." : "Add payment"}
                  </button>
                </form>
              )}
              {project.manualPayments && project.manualPayments.length > 0 && (
                <div className="mt-4 border-t border-zinc-700 pt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Manual payments
                  </p>
                  <ul className="mt-2 space-y-2">
                    {project.manualPayments.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm"
                      >
                        <span className="text-white">
                          ${p.amount.toFixed(2)}
                          {p.method && (
                            <span className="ml-2 text-zinc-500">({p.method})</span>
                          )}
                        </span>
                        <span className="text-zinc-500">
                          {formatDate(p.date)}
                          {p.notes && ` · ${p.notes}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Recurring payments - only when launch or complete */}
          {(project.status === "launch" || project.status === "complete") && (
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Recurring payments
              </h3>
              <div className="mt-4 space-y-4 rounded-lg border border-zinc-800 bg-zinc-800/30 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddRecurring(true)}
                    className="rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30"
                  >
                    Add recurring payment
                  </button>
                  {subscriptions.length > 0 && customer && (
                    <button
                      type="button"
                      onClick={handleOpenBillingPortal}
                      className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                    >
                      Customer billing portal →
                    </button>
                  )}
                </div>
                {subscriptions.length === 0 ? (
                  <p className="text-sm text-zinc-500">
                    No recurring subscriptions yet. Add one when the project is launched or complete.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {subscriptions.map((sub) => {
                    const total = sub.amount ?? (sub.items?.reduce((s, i) => s + i.amount, 0) ?? 0);
                    const displayName = sub.items && sub.items.length > 1
                      ? `Bundle: ${sub.items.map((i) => i.productName).join(" + ")}`
                      : sub.productName ?? sub.items?.[0]?.productName ?? "Subscription";
                    return (
                      <li
                        key={sub.id}
                        className="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3"
                      >
                        <div>
                          <p className="font-medium text-white">{displayName}</p>
                          <p className="text-sm text-zinc-500">
                            ${total.toFixed(2)}/{sub.interval ?? sub.items?.[0]?.interval ?? "month"}
                            {sub.firstPaymentDate && ` · First payment: ${sub.firstPaymentDate}`}
                            {sub.billingDay && !sub.firstPaymentDate && ` · Billing day: ${sub.billingDay}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              sub.status === "active"
                                ? sub.cancelAtPeriodEnd
                                  ? "bg-amber-500/20 text-amber-400"
                                  : "bg-emerald-500/20 text-emerald-400"
                                : sub.status === "canceled"
                                  ? "bg-zinc-600/50 text-zinc-400"
                                  : sub.status === "incomplete"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : "bg-amber-500/20 text-amber-400"
                            }`}
                            title={sub.status === "incomplete" ? "Customer needs to add payment method in billing portal" : undefined}
                          >
                            {sub.cancelAtPeriodEnd ? "Canceling" : sub.status === "incomplete" ? "Pending payment" : sub.status}
                          </span>
                          {sub.status !== "canceled" && (
                            <div className="flex gap-1">
                              {(sub.status === "incomplete" || sub.status === "past_due") && (
                                <button
                                  type="button"
                                  onClick={() => handleMarkSubscriptionPaid(sub.id)}
                                  disabled={markingPaidSubId === sub.id}
                                  className="rounded px-2 py-1 text-xs text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50"
                                  title="Customer paid you directly (check, wire, etc.)"
                                >
                                  {markingPaidSubId === sub.id ? "..." : "Mark paid"}
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleCancelSubscription(sub.id)}
                                disabled={cancelingSubId === sub.id || !!sub.cancelAtPeriodEnd}
                                className="rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white disabled:opacity-50"
                                title="Cancel at period end"
                              >
                                {cancelingSubId === sub.id ? "..." : "Cancel"}
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Documents section */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Documents
            </h3>
            <div className="mt-4 space-y-4">
              <form onSubmit={handleDocUpload} className="flex flex-wrap items-end gap-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-400">File</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={(e) => setDocFile(e.target.files?.[0] ?? null)}
                    className="mt-1 block text-sm text-zinc-400 file:mr-2 file:rounded-lg file:border-0 file:bg-rose-500/20 file:px-4 file:py-2 file:text-sm file:font-medium file:text-rose-400 file:hover:bg-rose-500/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400">Name (optional)</label>
                  <input
                    type="text"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    placeholder="e.g. Contract"
                    className="mt-1 w-40 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={docUploading || !docFile}
                  className="rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30 disabled:opacity-50"
                >
                  {docUploading ? "Uploading..." : "Upload"}
                </button>
              </form>
              {documentsLoading ? (
                <div className="flex h-12 items-center text-sm text-zinc-500">Loading documents...</div>
              ) : documents.length === 0 ? (
                <div className="rounded-lg border border-dashed border-zinc-700 bg-zinc-800/30 p-6 text-center text-sm text-zinc-500">
                  No documents yet. Upload contracts or other files above.
                </div>
              ) : (
                <ul className="space-y-2">
                  {documents.map((doc) => (
                    <li
                      key={doc.id}
                      className="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3"
                    >
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-400 hover:text-rose-300"
                      >
                        {doc.name}
                      </a>
                      <div className="flex items-center gap-2">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                        >
                          View
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDocDelete(doc.id)}
                          className="rounded-lg px-3 py-1.5 text-sm text-rose-400 transition-colors hover:bg-rose-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Updates section */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Updates
              </h3>
              <button
                onClick={() => setShowCreateModal(true)}
                className="rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30"
              >
                Create update
              </button>
            </div>
            {updates.length === 0 ? (
              <div className="mt-4 rounded-lg border border-dashed border-zinc-700 bg-zinc-800/30 p-8 text-center">
                <p className="text-sm text-zinc-500">No updates yet</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-3 rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30"
                >
                  Create update
                </button>
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {updates.map((update) => (
                  <button
                    key={update.id}
                    type="button"
                    onClick={() => setSelectedUpdate(update)}
                    className="group flex flex-col overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800/50 text-left transition-colors hover:border-zinc-600 hover:bg-zinc-800/70"
                  >
                    <div className="relative aspect-video bg-zinc-900">
                      {update.images?.[0] ? (
                        <img
                          src={update.images[0]}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-zinc-600">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-white group-hover:text-rose-400">
                        {update.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-zinc-500">
                        {formatDate(update.createdAt)}
                        {update.images && update.images.length > 1 && (
                          <span className="ml-1">· {update.images.length} images</span>
                        )}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create update modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-lg font-semibold text-white">Create update</h3>
            <form onSubmit={handleCreateUpdate} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400">
                  Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Homepage mockups v1"
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400">
                  Description
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe the update..."
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400">
                  Images
                </label>
                <div className="mt-2 space-y-3">
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-600 bg-zinc-800/50 py-8 transition-colors hover:border-zinc-500 hover:bg-zinc-800">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageFiles}
                      className="hidden"
                    />
                    <svg
                      className="h-10 w-10 text-zinc-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="mt-2 text-sm text-zinc-400">
                      Click to upload one or more images
                    </span>
                  </label>
                  {newImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {newImages.map((url, i) => (
                        <div
                          key={i}
                          className="group relative aspect-video overflow-hidden rounded-lg border border-zinc-700"
                        >
                          <img
                            src={url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(i)}
                            className="absolute right-1 top-1 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                            aria-label="Remove image"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving || !newTitle.trim()}
                  className="rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30 disabled:opacity-50"
                >
                  {saving ? "Creating..." : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewTitle("");
                    setNewDescription("");
                    setNewImages([]);
                  }}
                  className="rounded-lg bg-zinc-700/50 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add recurring payment modal */}
      {showAddRecurring && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-lg font-semibold text-white">Add recurring payment</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Select one or more products to bundle (one subscription = one Stripe fee). Set when the first payment is due.
            </p>
            <form onSubmit={handleCreateSubscription} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400">Products (select multiple to bundle)</label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-800/50 p-2">
                  {stripeProducts.map((p) => (
                    <label
                      key={p.priceId}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${
                        selectedPriceIds.includes(p.priceId)
                          ? "border-rose-500/50 bg-rose-500/10"
                          : "border-zinc-700 hover:border-zinc-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPriceIds.includes(p.priceId)}
                        onChange={() => togglePriceSelection(p.priceId)}
                        className="rounded border-zinc-600 text-rose-500 focus:ring-rose-500/50"
                      />
                      <span className="text-sm text-white">{p.productName}</span>
                      <span className="ml-auto text-xs text-zinc-500">
                        ${p.amount.toFixed(2)}/{p.interval}
                      </span>
                    </label>
                  ))}
                </div>
                {stripeProducts.length === 0 && (
                  <p className="mt-2 text-xs text-zinc-500">
                    No recurring products in Stripe. Create one in your Stripe Dashboard.
                  </p>
                )}
                {selectedPriceIds.length > 0 && (
                  <p className="mt-2 text-xs text-emerald-400">
                    {selectedPriceIds.length} product{selectedPriceIds.length > 1 ? "s" : ""} selected – bundled into one subscription
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400">First payment date</label>
                <input
                  type="date"
                  value={firstPaymentDate}
                  onChange={(e) => setFirstPaymentDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                />
                <p className="mt-1 text-xs text-zinc-500">
                  Leave empty to charge immediately. Set a future date (e.g. March 23) to avoid past-due status.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400">Billing day (1–28, for display)</label>
                <input
                  type="number"
                  min={1}
                  max={28}
                  value={billingDay}
                  onChange={(e) => setBillingDay(Math.min(28, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={subCreating || selectedPriceIds.length === 0}
                  className="rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30 disabled:opacity-50"
                >
                  {subCreating ? "Creating..." : "Create subscription"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddRecurring(false);
                    setSelectedPriceIds([]);
                    setBillingDay(1);
                    setFirstPaymentDate("");
                  }}
                  className="rounded-lg bg-zinc-700/50 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update detail modal */}
      {selectedUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {selectedUpdate.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {formatDate(selectedUpdate.createdAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedUpdate(null)}
                  className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="space-y-6 p-6">
              {selectedUpdate.description && (
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Description
                  </h4>
                  <p className="mt-2 text-zinc-300">{selectedUpdate.description}</p>
                </div>
              )}
              {selectedUpdate.images && selectedUpdate.images.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Images ({selectedUpdate.images.length})
                  </h4>
                  <div
                    className={`mt-2 grid gap-4 ${
                      selectedUpdate.images.length === 1
                        ? "grid-cols-1"
                        : selectedUpdate.images.length === 2
                          ? "grid-cols-1 sm:grid-cols-2"
                          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {selectedUpdate.images.map((url, i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-lg border border-zinc-700"
                      >
                        <img
                          src={url}
                          alt={`Update image ${i + 1} of ${selectedUpdate.images!.length}`}
                          className="w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Customer feedback
                </h4>
                {selectedFeedback ? (
                  <div className="mt-4 space-y-4 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
                    <div className="flex items-center gap-2">
                      {selectedFeedback.liked === true && (
                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-sm font-medium text-emerald-400">
                          Liked
                        </span>
                      )}
                      {selectedFeedback.liked === false && (
                        <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-sm font-medium text-rose-400">
                          Disliked
                        </span>
                      )}
                      {selectedFeedback.liked === null && (
                        <span className="rounded-full bg-zinc-600/50 px-2.5 py-0.5 text-sm font-medium text-zinc-400">
                          No reaction
                        </span>
                      )}
                    </div>
                    {selectedFeedback.comment && (
                      <div>
                        <p className="text-sm font-medium text-zinc-400">
                          Comment
                        </p>
                        <p className="mt-1 text-white">{selectedFeedback.comment}</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-zinc-400">
                        Your reply
                      </label>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Reply to the customer..."
                        rows={3}
                        className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                      />
                      <button
                        type="button"
                        onClick={handleSaveReply}
                        disabled={saving}
                        className="mt-2 rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30 disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save reply"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-lg border border-dashed border-zinc-700 bg-zinc-800/30 p-4">
                    <p className="text-sm text-zinc-500">
                      No feedback yet from the customer.
                    </p>
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-zinc-400">
                        Add a reply (optional)
                      </label>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Add a note or reply..."
                        rows={2}
                        className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                      />
                      <button
                        type="button"
                        onClick={handleSaveReply}
                        disabled={saving || !replyText.trim()}
                        className="mt-2 rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30 disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save reply"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
