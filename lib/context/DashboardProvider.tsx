"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const DASHBOARD_AUTH_KEY = "dashboard_admin";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "client";
}

interface DashboardContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(DASHBOARD_AUTH_KEY) : null;
    if (stored === "1") {
      setUser({ id: "admin", email: "admin@thewebprism.com", name: "Admin", role: "admin" });
    }
    setIsLoading(false);
  }, []);

  const setUserWithStorage = (u: User | null) => {
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem(DASHBOARD_AUTH_KEY, "1");
      else localStorage.removeItem(DASHBOARD_AUTH_KEY);
    }
    setUser(u);
  };

  const value: DashboardContextValue = {
    user,
    setUser: setUserWithStorage,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return ctx;
}
