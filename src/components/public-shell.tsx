import type { ReactNode } from "react";

export function PublicShell({ children }: { children: ReactNode }) {
  return <div className="site-shell site-shell-public">{children}</div>;
}

