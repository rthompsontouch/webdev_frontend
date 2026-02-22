"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePortal } from "@/lib/context/PortalProvider";

export default function PortalInvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { customerId, setCustomerId } = usePortal();
  const token = searchParams.get("token");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (customerId) {
      router.replace("/portal");
      return;
    }
    if (!token) {
      setError("Invalid invite link");
      setFetching(false);
      return;
    }

    fetch(`/api/portal/invite?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Invalid or expired link");
        return data;
      })
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "This invite link is invalid or has expired."))
      .finally(() => setFetching(false));
  }, [token, customerId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/portal/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to set password");

      setCustomerId(data.customerId);
      router.push("/portal");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
      </div>
    );
  }

  if (error && !name) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <h1 className="text-xl font-semibold text-white">Invalid invite link</h1>
          <p className="mt-2 text-sm text-zinc-400">{error}</p>
          <a
            href="/portal/login"
            className="mt-6 inline-block text-sm font-medium text-rose-400 hover:text-rose-300"
          >
            Go to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
        <h1 className="text-xl font-semibold text-white">Set your password</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Welcome, {name}. Create a password to access your project dashboard.
        </p>
        <p className="mt-1 text-xs text-zinc-500">{email}</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="At least 8 characters"
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-rose-500/50 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
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
            className="w-full cursor-pointer rounded-lg bg-rose-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Setting up..." : "Create password & sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
