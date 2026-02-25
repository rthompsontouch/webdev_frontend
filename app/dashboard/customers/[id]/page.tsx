"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getCustomer,
  updateCustomer,
  sendCustomerInvite,
  deleteCustomer,
  getProjects,
  createProject,
  getDocuments,
  uploadDocument,
  deleteDocument,
  type Customer,
  type Project,
  type ProjectType,
  type Document,
} from "@/lib/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
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

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "website_redesign", label: "Website Redesign" },
  { value: "new_website", label: "New Website" },
  { value: "seo", label: "SEO" },
  { value: "marketing", label: "Marketing" },
  { value: "other", label: "Other" },
];

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectType, setNewProjectType] = useState<ProjectType>("new_website");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [docUploading, setDocUploading] = useState(false);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docName, setDocName] = useState("");

  useEffect(() => {
    Promise.all([getCustomer(id), getProjects(id)])
      .then(([c, p]) => {
        setCustomer(c ?? null);
        setNotes(c?.notes ?? "");
        setProjects(p);
      })
      .catch(() => setError("Failed to load customer"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    setDocumentsLoading(true);
    getDocuments(id)
      .then(setDocuments)
      .catch(() => setDocuments([]))
      .finally(() => setDocumentsLoading(false));
  }, [id]);

  const handleSaveNotes = async () => {
    if (!customer) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateCustomer(customer.id, { notes: notes || undefined });
      setCustomer(updated);
    } catch {
      setError("Failed to save notes");
    } finally {
      setSaving(false);
    }
  };

  const handleInvite = async () => {
    if (!customer || customer.inviteStatus === "signed_up") return;
    setSaving(true);
    setError(null);
    try {
      await sendCustomerInvite(customer.id);
      setCustomer((prev) => (prev ? { ...prev, inviteStatus: "invited" } : null));
    } catch {
      setError("Failed to send invite");
    } finally {
      setSaving(false);
    }
  };

  const handleDocUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !docFile) return;
    setDocUploading(true);
    setError(null);
    try {
      const doc = await uploadDocument(docFile, {
        customerId: customer.id,
        name: docName.trim() || docFile.name,
        type: "other",
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

  const handleDelete = async () => {
    if (!customer) return;
    if (
      !confirm(
        `Delete ${customer.name}? This will permanently remove this customer and all their projects, documents, and subscriptions. This cannot be undone.`
      )
    )
      return;
    setSaving(true);
    setError(null);
    try {
      await deleteCustomer(customer.id);
      router.push("/dashboard/customers");
    } catch {
      setError("Failed to delete customer");
    } finally {
      setSaving(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !newProjectName.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const project = await createProject(customer.id, {
        type: newProjectType,
        name: newProjectName.trim(),
      });
      setProjects((prev) => [...prev, project]);
      setNewProjectName("");
      setNewProjectType("new_website");
      setShowAddProject(false);
    } catch {
      setError("Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  const currentProjects = projects.filter((p) => p.status !== "complete");
  const pastProjects = projects.filter((p) => p.status === "complete");

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
      </div>
    );
  }

  if (error && !customer) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/customers"
          className="text-sm text-rose-400 hover:text-rose-300"
        >
          ← Back to customers
        </Link>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          {error}
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/customers"
          className="text-sm text-rose-400 hover:text-rose-300"
        >
          ← Back to customers
        </Link>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-12 text-center text-zinc-500">
          Customer not found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/customers"
        className="text-sm text-rose-400 hover:text-rose-300"
      >
        ← Back to customers
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
              <h1 className="text-2xl font-semibold text-white">{customer.name}</h1>
              <p className="mt-1 text-zinc-400">{customer.company ?? "—"}</p>
              <p className="mt-2 text-sm text-zinc-500">{customer.email}</p>
              {customer.phone && (
                <p className="mt-1 text-sm text-zinc-500">{customer.phone}</p>
              )}
              <p className="mt-2 text-xs text-zinc-500">
                Added {formatDate(customer.createdAt)}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
            {customer.inviteStatus === "not_invited" && (
              <button
                onClick={handleInvite}
                disabled={saving}
                className="rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30 disabled:opacity-50"
              >
                Invite to dashboard
              </button>
            )}
            {customer.inviteStatus === "invited" && (
              <>
                <span className="rounded-lg bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-400">
                  Invited
                </span>
                <button
                  onClick={handleInvite}
                  disabled={saving}
                  className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:opacity-50"
                >
                  {saving ? "Sending..." : "Resend invite"}
                </button>
              </>
            )}
            <button
              onClick={handleDelete}
              disabled={saving}
              className="rounded-lg border border-rose-500/30 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/20 disabled:opacity-50"
            >
              Delete customer
            </button>
          </div>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {/* Projects */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Projects
            </h3>
            {projects.length === 0 ? (
              <div className="mt-4 rounded-lg border border-dashed border-zinc-700 bg-zinc-800/30 p-8 text-center">
                <p className="text-sm text-zinc-500">No projects yet</p>
                <button
                  onClick={() => setShowAddProject(true)}
                  className="mt-3 rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30"
                >
                  Add a project
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-6">
                {currentProjects.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-zinc-400">
                      Current
                    </h4>
                    <div className="space-y-2">
                      {currentProjects.map((project) => (
                        <Link
                          key={project.id}
                          href={`/dashboard/projects/${project.id}`}
                          className="block rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 transition-colors hover:border-zinc-600 hover:bg-zinc-800/70"
                        >
                          <div className="flex items-center justify-between">
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
                      ))}
                    </div>
                  </div>
                )}
                {pastProjects.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-zinc-400">
                      Past
                    </h4>
                    <div className="space-y-2">
                      {pastProjects.map((project) => (
                        <Link
                          key={project.id}
                          href={`/dashboard/projects/${project.id}`}
                          className="block rounded-lg border border-zinc-700 bg-zinc-800/30 px-4 py-3 transition-colors hover:border-zinc-600 hover:bg-zinc-800/50"
                        >
                          <div className="flex items-center justify-between">
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
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setShowAddProject(true)}
                  className="rounded-lg border border-zinc-700 bg-zinc-800/30 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:bg-zinc-800/50 hover:text-zinc-300"
                >
                  + Add a project
                </button>
              </div>
            )}
          </div>

          {/* Add project modal */}
          {showAddProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
              <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="text-lg font-semibold text-white">Add a project</h3>
                <form onSubmit={handleAddProject} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400">
                      Project name
                    </label>
                    <input
                      type="text"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="e.g. Website Redesign"
                      required
                      className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400">
                      Type
                    </label>
                    <select
                      value={newProjectType}
                      onChange={(e) => setNewProjectType(e.target.value as ProjectType)}
                      className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
                    >
                      {PROJECT_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saving || !newProjectName.trim()}
                      className="rounded-lg bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30 disabled:opacity-50"
                    >
                      {saving ? "Creating..." : "Create project"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddProject(false);
                        setNewProjectName("");
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

          {/* Documents */}
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

          {/* Notes */}
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
        </div>
      </div>
    </div>
  );
}
