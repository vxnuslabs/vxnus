import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminArticleEditor } from "@/components/admin-article-editor";
import { getAdminArticleArticle } from "@/lib/admin-content";

export const metadata = { title: "Edit article — VXNUS", robots: { index: false, follow: false } };

type EditArticlePageProps = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const article = await getAdminArticleArticle(Number(id));
  if (!article) notFound();

  return (
    <main className="admin-main admin-editor-page">
      <Link className="admin-back-link" href="/admin/content">← Content archive</Link>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Workspace / Article / {article.articleId}</p>
          <h1>Edit article.</h1>
        </div>
        <Link className="admin-public-link" href={`/article/${article.slug}`}>View public article ↗</Link>
      </div>
      <AdminArticleEditor article={article} />
    </main>
  );
}

