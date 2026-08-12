import Link from "next/link";

import { getAdminArticle } from "@/lib/admin-content";

export const metadata = { title: "Admin overview — VXNUS", robots: { index: false, follow: false } };

export default async function AdminDashboardPage() {
  const article = await getAdminArticle();
  const published = article.filter((article) => article.status === "published").length;
  const drafts = article.filter((article) => article.status === "draft").length;
  const archived = article.filter((article) => article.status === "archived").length;

  return (
    <main className="admin-main">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Workspace / Overview</p>
          <h1>Good morning.</h1>
        </div>
        <p>Editorial state at a glance.</p>
      </div>

      <section className="admin-metrics" aria-label="Content summary">
        <div><span>Published article</span><strong>{published}</strong></div>
        <div><span>Drafts</span><strong>{drafts}</strong></div>
        <div><span>Archived</span><strong>{archived}</strong></div>
      </section>

      <section className="admin-section">
        <div className="admin-section-heading">
          <h2>Recent article</h2>
          <Link href="/admin/content">View all →</Link>
        </div>
        <div className="admin-record-list">
          {article.slice(0, 5).map((article) => (
            <Link className="admin-record" href={`/admin/article/${article.id}/edit`} key={article.id}>
              <span>{article.articleId}</span>
              <strong>{article.title}</strong>
              <span className={`admin-status admin-status-${article.status}`}>{article.status}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="admin-note">
        <p className="admin-eyebrow">Publishing principle</p>
        <p>Publish when the work is useful, not when the calendar asks for something new.</p>
      </section>
    </main>
  );
}
