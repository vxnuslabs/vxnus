import type { ReactNode } from "react";

import { PublicPage } from "./public-page";

export function ArchivePage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <PublicPage>
      <div className="archive-page">
        <div className="archive-intro">
          <p className="meta-line">VXNUS / Archive</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
      </div>
    </PublicPage>
  );
}

