import type { Project, ProjectStatus, ProjectType, ProjectUpdate, ProjectUpdateFeedback } from "@/lib/types/dashboard";
import { api } from "./client";

export async function updateProjectStatus(
  id: string,
  status: ProjectStatus
): Promise<Project> {
  return api.patch<Project>(`/projects/${id}`, { status });
}

export async function createProject(
  customerId: string,
  data: { type: ProjectType; name: string }
): Promise<Project> {
  return api.post<Project>("/projects", { customerId, ...data });
}

export async function getProjects(customerId?: string): Promise<Project[]> {
  const query = customerId ? `?customerId=${customerId}` : "";
  return api.get<Project[]>(`/projects${query}`);
}

export async function getProject(id: string): Promise<Project | null> {
  return api.get<Project | null>(`/projects/${id}`);
}

export async function getProjectUpdates(projectId: string): Promise<ProjectUpdate[]> {
  return api.get<ProjectUpdate[]>(`/projects/${projectId}/updates`);
}

export async function getUpdate(id: string): Promise<ProjectUpdate | null> {
  try {
    return await api.get<ProjectUpdate>(`/updates/${id}`);
  } catch {
    return null;
  }
}

export async function getUpdateFeedback(
  updateId: string,
  customerId?: string
): Promise<ProjectUpdateFeedback | null> {
  const query = customerId ? `?customerId=${customerId}` : "";
  return api.get<ProjectUpdateFeedback | null>(`/updates/${updateId}/feedback${query}`);
}

export async function replyToFeedback(
  updateId: string,
  reply: string
): Promise<ProjectUpdateFeedback> {
  return api.patch<ProjectUpdateFeedback>(`/updates/${updateId}/feedback`, { reply });
}

export async function createProjectUpdate(
  projectId: string,
  data: { title: string; description: string; images?: string[] }
): Promise<ProjectUpdate> {
  return api.post<ProjectUpdate>(`/projects/${projectId}/updates`, data);
}

export async function submitFeedback(
  updateId: string,
  customerId: string,
  data: { liked?: boolean | null; comment?: string; viewed?: boolean }
): Promise<ProjectUpdateFeedback> {
  return api.post<ProjectUpdateFeedback>(`/updates/${updateId}/feedback`, {
    customerId,
    ...data,
  });
}
