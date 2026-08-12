import type { ReactNode } from "react";

import { AdminNav } from "@/components/admin-nav";
import { AdminShell } from "@/components/admin-shell";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin — VXNUS",
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <AdminShell>
      <div className="admin-frame">
        <AdminNav />
        {children}
      </div>
    </AdminShell>
  );
}
