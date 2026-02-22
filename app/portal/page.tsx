"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePortal } from "@/lib/context/PortalProvider";

type PortalProject = {
  id: string;
  customerId: string;
  type: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  unviewedUpdatesCount: number;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerId && !isLoading) {
      router.replace("/portal/login");
      return;
    }
    if (customerId) {
      fetch(`/api/portal/projects?customerId=${encodeURIComponent(customerId)}`)
        .then((res) => res.json())
        .then((data) => setProjects(Array.isArray(data) ? data : []))
        .catch(() => setProjects([]))
        .finally(() => setLoading(false));
    }
  }, [customerId, isLoading, router]);

  if (isLoading || !customerId) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Your Projects</h1>
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
