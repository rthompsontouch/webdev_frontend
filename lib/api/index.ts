/**
 * Dashboard API - single import point.
 * Uses /api/dashboard (MongoDB-backed) when NEXT_PUBLIC_API_URL is not set.
 */

export { api, ApiError } from "./client";
export * from "./leads";
export * from "./customers";
export * from "./projects";
export * from "./documents";
export * from "./stripe";
export * from "./subscriptions";
