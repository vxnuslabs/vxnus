import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/article-body";
import { getAdminArticleArticle } from "@/lib/admin-content";

export const metadata = { title: "Article preview — VXNUS", robots: { index: false, follow: false } };

type PreviewPageProps = { params: Promise<{ id: string }> };

export default async function ArticlePreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;
  const article = await getAdminArticleArticle(Number(id));
  if (!article) notFound();

  return (
    <main className="admin-main admin-preview-page">
      <div className="admin-preview-bar">
        <span>Preview / {article.articleId}</span>
        <Link href={`/admin/article/${article.id}/edit`}>← Back to editor</Link>
      </div>
      <article className="admin-preview-article">
        <p className="admin-eyebrow">{article.articleId}</p>
        <h1>{article.title}</h1>
        {article.subtitle && <p className="admin-preview-subtitle">{article.subtitle}</p>}
        <ArticleBody body={article.body} title={article.title} />
      </article>
    </main>
  );
}
