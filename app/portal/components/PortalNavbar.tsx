"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePortal } from "@/lib/context/PortalProvider";
import { updateCustomer } from "@/lib/api";

export default function PortalNavbar() {
  const router = useRouter();
  const { customer, customerId, setCustomerId } = usePortal();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
      setCompany(customer.company ?? "");
      setPhone(customer.phone ?? "");
    }
  }, [customer]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await updateCustomer(customerId, {
        name,
        email,
        company: company || undefined,
        phone: phone || undefined,
      });
      setMessage("Profile updated.");
      setShowEditProfile(false);
      router.refresh();
    } catch {
      setError("Failed to update.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    setCustomerId(null);
    router.replace("/portal/login");
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-900/95 px-4 backdrop-blur">
        <div className="flex items-center gap-4">
          <Link
            href="/portal"
            className="portal-nav-logo flex cursor-pointer items-center gap-3"
          >
            <Image
              src="/images/logo/TheWebPrism_LOGO.png"
              alt="TheWebPrism"
              width={160}
              height={40}
              className="h-10 w-auto"
            />
            <span className="hidden border-l border-zinc-700 pl-4 text-sm font-semibold text-rose-400 sm:block">
              Client Portal
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+19193466039"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-rose-400 sm:flex"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (919) 346-6039
          </a>
          {/* Notifications */}
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setDropdownOpen(false);
            }}
            className="portal-nav-notifications cursor-pointer rounded-lg p-2.5 text-zinc-400"
            aria-label="Notifications"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setShowNotifications(false);
              }}
              className="portal-nav-profile flex cursor-pointer items-center gap-2.5 rounded-lg border border-zinc-700/50 px-3 py-2"
              aria-label="Profile menu"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-rose-500/20 text-sm font-medium text-rose-400">
                {customer?.name?.charAt(0)?.toUpperCase() ?? "?"}
              </div>
              <div className="hidden min-w-0 text-left sm:block">
                <p className="truncate text-sm font-medium text-white">
                  {customer?.name ?? "Account"}
                </p>
                <p className="truncate text-xs text-rose-400/90">
                  {customer?.company || customer?.email || "Client"}
                </p>
              </div>
              <svg
                className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-zinc-700 bg-zinc-900 py-1 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditProfile(true);
                    setDropdownOpen(false);
                  }}
                  className="portal-nav-dropdown-item flex w-full cursor-pointer items-center gap-2 border-l-2 border-transparent px-4 py-2.5 text-left text-sm text-zinc-300"
                >
                  <svg className="h-4 w-4 shrink-0 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Edit contact info
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowResetPassword(true);
                    setDropdownOpen(false);
                  }}
                  className="portal-nav-dropdown-item flex w-full cursor-pointer items-center gap-2 border-l-2 border-transparent px-4 py-2.5 text-left text-sm text-zinc-300"
                >
                  <svg className="h-4 w-4 shrink-0 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Reset password
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="portal-nav-dropdown-signout flex w-full cursor-pointer items-center gap-2 border-l-2 border-transparent px-4 py-2.5 text-left text-sm text-rose-400"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Notifications dropdown placeholder */}
      {showNotifications && (
        <div className="fixed right-4 top-16 z-30 w-72 rounded-lg border border-zinc-700 bg-zinc-900 py-2 shadow-xl">
          <p className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Notifications
          </p>
          <p className="px-4 py-6 text-center text-sm text-zinc-500">
            No new notifications
          </p>
        </div>
      )}

      {/* Edit profile modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-lg font-semibold text-white">Edit contact info</h3>
            {message && (
              <p className="mt-2 text-sm text-emerald-400">{message}</p>
            )}
            {error && (
              <p className="mt-2 text-sm text-rose-400">{error}</p>
            )}
            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="cursor-pointer rounded-lg border border-zinc-600 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="cursor-pointer rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset password modal */}
      {showResetPassword && (
        <ResetPasswordModal
          customerId={customerId!}
          onClose={() => setShowResetPassword(false)}
          onSuccess={() => setShowResetPassword(false)}
        />
      )}
    </>
  );
}

function ResetPasswordModal({
  customerId,
  onClose,
  onSuccess,
}: {
  customerId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/portal/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          currentPassword,
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h3 className="text-lg font-semibold text-white">Reset password</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400">Current password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400">New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400">Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
            />
          </div>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-zinc-600 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
