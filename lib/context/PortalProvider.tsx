"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Customer } from "@/lib/types/dashboard";

const PORTAL_CUSTOMER_KEY = "portal_customer_id";

interface PortalContextValue {
  customer: Customer | null;
  customerId: string | null;
  setCustomerId: (id: string | null) => void;
  isLoading: boolean;
}

const PortalContext = createContext<PortalContextValue | null>(null);

export function PortalProvider({ children }: { children: ReactNode }) {
  const [customerId, setCustomerIdState] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(PORTAL_CUSTOMER_KEY) : null;
    setCustomerIdState(stored);
  }, []);

  const setCustomerId = (id: string | null) => {
    if (typeof window !== "undefined") {
      if (id) localStorage.setItem(PORTAL_CUSTOMER_KEY, id);
      else localStorage.removeItem(PORTAL_CUSTOMER_KEY);
    }
    setCustomerIdState(id);
    setCustomer(null);
  };

  useEffect(() => {
    if (!customerId) {
      setCustomer(null);
      setIsLoading(false);
      return;
    }
    import("@/lib/api")
      .then(({ getCustomer }) => getCustomer(customerId))
      .then((c) => {
        setCustomer(c ?? null);
      })
      .catch(() => setCustomer(null))
      .finally(() => setIsLoading(false));
  }, [customerId]);

  return (
    <PortalContext.Provider
      value={{ customer, customerId, setCustomerId, isLoading }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used within PortalProvider");
  return ctx;
}
