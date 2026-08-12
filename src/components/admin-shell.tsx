import type { ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  return <div className="site-shell site-shell-admin">{children}</div>;
}

