import Link from "next/link";

import { AdminArticleEditor } from "@/components/admin-article-editor";

export const metadata = { title: "New article — VXNUS", robots: { index: false, follow: false } };

export default function NewArticlePage() {
  return (
    <main className="admin-main admin-editor-page">
      <Link className="admin-back-link" href="/admin/content">← Content archive</Link>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Workspace / Article</p>
          <h1>Start a draft.</h1>
        </div>
        <p>Write for the archive first. Publishing comes after review.</p>
      </div>
      <AdminArticleEditor />
    </main>
  );
}

