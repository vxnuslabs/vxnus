import type { ReactNode } from "react";

import { PublicFooter } from "./public-footer";
import { PublicNav } from "./public-nav";
import { PublicShell } from "./public-shell";
import { SiteJsonLd } from "./site-json-ld";
import { PublicSidebar } from "./public-sidebar";

export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <PublicShell>
      <div className="layout-container">
        <PublicSidebar />
        <main className="main-content">
          <div className="public-frame">
            <SiteJsonLd />
            <PublicNav />
            {children}
            <PublicFooter />
          </div>
        </main>
      </div>
    </PublicShell>
  );
}
