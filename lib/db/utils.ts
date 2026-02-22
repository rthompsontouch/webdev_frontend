import type { Document } from "mongoose";

export function toAPI<T extends Document>(doc: T | null): Record<string, unknown> | null {
  if (!doc) return null;
  const obj = doc.toObject();
  const { _id, __v, ...rest } = obj as Record<string, unknown> & { _id: unknown };
  return { id: String(_id), ...rest } as Record<string, unknown>;
}

export function toAPIArray<T extends Document>(docs: T[]): Record<string, unknown>[] {
  return docs.map((d) => toAPI(d)!).filter(Boolean);
}
