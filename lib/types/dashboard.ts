/**
 * Shared types for the dashboard portal.
 * These will align with backend models when the API is built.
 */

export type LeadStatus = "new" | "contacted" | "converted" | "not_interested";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  interested: string;
  project: string;
  status: LeadStatus;
  createdAt: string;
  notes?: string;
}

export type InviteStatus = "not_invited" | "invited" | "signed_up";

export interface Customer {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  notes?: string;
  inviteStatus?: InviteStatus;
  createdAt: string;
  updatedAt: string;
}

export type ProjectType = "website_redesign" | "new_website" | "seo" | "marketing" | "other";

export type ProjectStatus = "discovery" | "design" | "development" | "review" | "launch" | "complete";

export interface Project {
  id: string;
  customerId: string;
  type: ProjectType;
  name: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  title: string;
  description: string;
  images?: string[];
  createdAt: string;
}

export interface ProjectUpdateFeedback {
  id: string;
  updateId: string;
  customerId?: string;
  liked: boolean | null;
  comment?: string;
  reply?: string;
  viewedAt?: string;
  createdAt: string;
}
