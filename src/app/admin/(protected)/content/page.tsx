import Link from "next/link";

import { changeArticleStatus, changeWorkStatus } from "@/app/admin/actions";
import { getAdminArticle, getAdminWork } from "@/lib/admin-content";

export const metadata = { title: "Content — VXNUS", robots: { index: false, follow: false } };

type ContentPageProps = {
  searchParams: Promise<{ q?: string; status?: string; saved?: string; error?: string }>;
};

export default async function AdminContentPage({ searchParams }: ContentPageProps) {
  const params = await searchParams;
  const query = params.q?.toLowerCase().trim() ?? "";
  const statusFilter = ["draft", "published", "archived"].includes(params.status ?? "") ? params.status : "";
  
  const article = (await getAdminArticle())
    .filter((article) =>
      (!query || `${article.title} ${article.articleId}`.toLowerCase().includes(query)) &&
      (statusFilter ? article.status === statusFilter : article.status !== "archived"),
    )
    .sort((a, b) => b.articleId.localeCompare(a.articleId, undefined, { numeric: true }));

  const work = (await getAdminWork())
    .filter((w) =>
      (!query || `${w.title} ${w.slug}`.toLowerCase().includes(query)) &&
      (statusFilter ? w.status === statusFilter : w.status !== "archived"),
    )
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  return (
    <main className="admin-main">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Workspace / Content</p>
          <h1>Content archive.</h1>
        </div>
        <div className="admin-heading-links">
          <Link className="admin-solid-link" href="/admin/article/new">New article</Link>
          <Link className="admin-outline-link" href="/admin/work/new">New work</Link>
        </div>
      </div>

      {params.saved && <p className="admin-form-success" role="status">Changes saved.</p>}
      {params.error && <p className="admin-form-error" role="alert">The requested change could not be completed.</p>}

      <form className="admin-filter" action="/admin/content" method="get">
        <label htmlFor="content-search">Search content</label>
        <input id="content-search" name="q" defaultValue={params.q} placeholder="Title, ID, or lab" />
        <label htmlFor="content-status">Status</label>
        <select id="content-status" name="status" defaultValue={statusFilter}>
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <section className="admin-section">
        <div className="admin-section-heading">
          <h2>Work / {work.length}</h2>
          <span className="admin-muted">All work states</span>
        </div>
        <div className="admin-record-list">
          {work.map((w) => (
            <div className="admin-record admin-record-with-actions" key={`work-${w.id}`}>
              <span className="admin-muted">{w.type === "open_source" ? "Open Source" : "Project"}</span>
              <strong>{w.title}</strong>
              <span className={`admin-status admin-status-${w.status}`}>{w.status}</span>
              <time dateTime={w.updatedAt.toISOString()}>{formatDate(w.updatedAt)}</time>
              <form className="admin-inline-actions" action={changeWorkStatus}>
                <input type="hidden" name="id" value={w.id} />
                <input type="hidden" name="status" value={w.status === "published" ? "draft" : "published"} />
                <button className="admin-text-button" type="submit">{w.status === "published" ? "Unpublish" : "Publish"}</button>
              </form>
              <form className="admin-inline-actions" action={changeWorkStatus}>
                <input type="hidden" name="id" value={w.id} />
                <input type="hidden" name="status" value="archived" />
                <button className="admin-text-button" type="submit">Archive</button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-section-heading">
          <h2>Article / {article.length}</h2>
          <span className="admin-muted">All article states</span>
        </div>
        <div className="admin-record-list">
          {article.map((article) => (
            <div className="admin-record admin-record-with-actions" key={`article-${article.id}`}>
              <span>{article.articleId}</span>
              <Link href={`/admin/article/${article.id}/edit`}><strong>{article.title}</strong></Link>
              <span className={`admin-status admin-status-${article.status}`}>{article.status}</span>
              <time dateTime={article.updatedAt.toISOString()}>{formatDate(article.updatedAt)}</time>
              <form className="admin-inline-actions" action={changeArticleStatus}>
                <input type="hidden" name="id" value={article.id} />
                <input type="hidden" name="status" value={article.status === "published" ? "draft" : "published"} />
                <button className="admin-text-button" type="submit">{article.status === "published" ? "Unpublish" : "Publish"}</button>
              </form>
              <form className="admin-inline-actions" action={changeArticleStatus}>
                <input type="hidden" name="id" value={article.id} />
                <input type="hidden" name="status" value="archived" />
                <button className="admin-text-button" type="submit">Archive</button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}
