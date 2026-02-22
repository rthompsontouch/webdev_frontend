"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { portalLogin } from "@/lib/api";
import { usePortal } from "@/lib/context/PortalProvider";

export default function PortalLoginPage() {
  const router = useRouter();
  const { customerId, setCustomerId } = usePortal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customerId) router.replace("/portal");
  }, [customerId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { customerId: id } = await portalLogin(email, password);
      setCustomerId(id);
      router.push("/portal");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
        <h1 className="text-xl font-semibold text-white">Client Portal</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Sign in to view your projects and provide feedback.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
            />
          </div>
          {error && (
            <p className="text-sm text-rose-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-rose-500/20 py-2.5 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-zinc-500">
          Use the invite link from your email to set your password first.
        </p>
      </div>
    </div>
  );
}
