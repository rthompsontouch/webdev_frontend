"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getProject,
  getProjectUpdates,
  getUpdateFeedback,
  submitFeedback,
  type Project,
  type ProjectUpdate,
  type ProjectUpdateFeedback,
} from "@/lib/api";
import { usePortal } from "@/lib/context/PortalProvider";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

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

type UpdateStatus = "new" | "awaiting_feedback" | "reviewed";

function getUpdateStatus(feedback: ProjectUpdateFeedback | null): UpdateStatus {
  if (!feedback) return "new";
  const hasReaction = feedback.liked !== null || (feedback.comment?.trim() ?? "").length > 0;
  return hasReaction ? "reviewed" : "awaiting_feedback";
}

export default function PortalProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { customerId, isLoading } = usePortal();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, ProjectUpdateFeedback | null>>({});
  const [loading, setLoading] = useState(true);
  const [selectedUpdate, setSelectedUpdate] = useState<ProjectUpdate | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<ProjectUpdateFeedback | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!customerId && !isLoading) {
      router.replace("/portal/login");
      return;
    }
  }, [customerId, isLoading, router]);

  useEffect(() => {
    if (!customerId) return;
    getProject(projectId)
      .then((p) => setProject(p ?? null))
      .catch(() => setProject(null));
  }, [projectId, customerId]);

  useEffect(() => {
    if (!customerId) return;
    getProjectUpdates(projectId)
      .then(async (u) => {
        setUpdates(u);
        const map: Record<string, ProjectUpdateFeedback | null> = {};
        await Promise.all(
          u.map(async (update) => {
            const f = await getUpdateFeedback(update.id, customerId);
            map[update.id] = f ?? null;
          })
        );
        setFeedbackMap(map);
      })
      .finally(() => setLoading(false));
  }, [projectId, customerId]);

  useEffect(() => {
    if (!selectedUpdate || !customerId) return;
    getUpdateFeedback(selectedUpdate.id, customerId).then((f) => {
      setSelectedFeedback(f ?? null);
      setLiked(f?.liked ?? null);
      setComment(f?.comment ?? "");
    });
  }, [selectedUpdate?.id, customerId]);

  const handleViewUpdate = async (update: ProjectUpdate) => {
    setSelectedUpdate(update);
    const fb = await submitFeedback(update.id, customerId!, { viewed: true });
    setFeedbackMap((prev) => ({ ...prev, [update.id]: fb }));
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUpdate || !customerId) return;
    setSaving(true);
    try {
      const fb = await submitFeedback(selectedUpdate.id, customerId, {
        liked,
        comment: comment.trim() || undefined,
        viewed: true,
      });
      setSelectedFeedback(fb);
      setFeedbackMap((prev) => ({ ...prev, [selectedUpdate.id]: fb }));
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !customerId) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <Link href="/portal" className="text-sm text-rose-400 hover:text-rose-300">
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
      <Link href="/portal" className="text-sm text-rose-400 hover:text-rose-300">
        ← Back to projects
      </Link>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h1 className="text-2xl font-semibold text-white">{project.name}</h1>
        <p className="mt-1 capitalize text-zinc-400">
          {project.type.replace("_", " ")}
        </p>
        <div className="mt-3">
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Project phase
          </span>
          <span
            className={`ml-2 rounded-full px-2.5 py-0.5 text-sm font-medium capitalize ${projectPhaseColor(
              project.status
            )}`}
          >
            {project.status.replace("_", " ")}
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-white">Updates</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Click an update to view details and provide feedback.
        </p>
        {loading ? (
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
            Loading updates...
          </div>
        ) : updates.length === 0 ? (
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
            No updates yet.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {updates.map((update) => {
              const feedback = feedbackMap[update.id] ?? null;
              const status = getUpdateStatus(feedback);
              return (
                <button
                  key={update.id}
                  type="button"
                  onClick={() => handleViewUpdate(update)}
                  className="flex w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-4 text-left transition-colors hover:border-zinc-600 hover:bg-zinc-800/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded bg-zinc-900">
                      {update.images?.[0] ? (
                        <img
                          src={update.images[0]}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-zinc-600 text-xs">
                          —
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">{update.title}</p>
                      <p className="text-xs text-zinc-500">
                        {formatDate(update.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {status === "new" && (
                      <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                        New
                      </span>
                    )}
                    {status === "awaiting_feedback" && (
                      <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                        Awaiting your feedback
                      </span>
                    )}
                    {status === "reviewed" && (
                      <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                        {feedback?.reply ? "Replied" : "Reviewed"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

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
                          alt={`Image ${i + 1}`}
                          className="w-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedFeedback?.reply && (
                <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-rose-400/80">
                    Response from TheWebPrism
                  </h4>
                  <p className="mt-2 text-zinc-300">{selectedFeedback.reply}</p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Your feedback
                </h4>
                <form onSubmit={handleSubmitFeedback} className="mt-4 space-y-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLiked(true)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        liked === true
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                      }`}
                    >
                      Like
                    </button>
                    <button
                      type="button"
                      onClick={() => setLiked(false)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        liked === false
                          ? "bg-rose-500/20 text-rose-400"
                          : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                      }`}
                    >
                      Dislike
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400">
                      Comment
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      rows={3}
                      className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Submit feedback"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
