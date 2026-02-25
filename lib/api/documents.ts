import type { Document } from "@/lib/types/dashboard";
import { api } from "./client";

export type { Document };

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api/dashboard";

export async function getDocuments(
  customerId: string,
  projectId?: string
): Promise<Document[]> {
  const params = new URLSearchParams({ customerId });
  if (projectId) params.set("projectId", projectId);
  return api.get<Document[]>(`/documents?${params}`);
}

export async function uploadDocument(
  file: File,
  options: { customerId: string; projectId?: string; name?: string; type?: string }
): Promise<Document> {
  const formData = new FormData();
  formData.set("file", file);
  formData.set("customerId", options.customerId);
  if (options.projectId) formData.set("projectId", options.projectId);
  if (options.name) formData.set("name", options.name);
  if (options.type) formData.set("type", options.type);

  const url = `${API_BASE}/documents`;
  const res = await fetch(url, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error((data?.error as string) ?? "Upload failed");
  }
  return data as Document;
}

export async function deleteDocument(id: string): Promise<void> {
  await api.delete(`/documents/${id}`);
}
