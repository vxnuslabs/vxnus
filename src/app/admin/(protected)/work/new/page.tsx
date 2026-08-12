import Link from "next/link";

import { AdminWorkEditor } from "@/components/admin-work-editor";

export const metadata = { title: "New work — VXNUS", robots: { index: false, follow: false } };

export default function NewWorkPage() {
  return (
    <main className="admin-main admin-editor-page">
      <Link className="admin-back-link" href="/admin/content">← Content archive</Link>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Workspace / Studio work</p>
          <h1>Add work.</h1>
        </div>
        <p>Open source and projects.</p>
      </div>
      <AdminWorkEditor />
    </main>
  );
}

