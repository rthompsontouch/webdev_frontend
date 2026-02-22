/**
 * Dashboard API - single import point.
 * Uses mock data when NEXT_PUBLIC_API_URL is not set.
 * When backend is ready, set the env var and swap implementations - no frontend refactor.
 */

export { api, ApiError } from "./client";
export * from "./leads";
export * from "./customers";
export * from "./projects";
