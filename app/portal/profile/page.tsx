"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PortalProfilePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/portal");
  }, [router]);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
    </div>
  );
}
