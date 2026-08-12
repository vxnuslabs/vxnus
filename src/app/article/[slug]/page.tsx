import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/article-body";
import { ArticleJsonLd } from "@/components/article-json-ld";
import { ArticleRelated } from "@/components/article-related";
import { CopyMarkdownButton } from "@/components/copy-markdown-button";
import { PublicPage } from "@/components/public-page";
import {
  getPublicArticleArticle,
  getPublicArticleSlugs,
  getRelatedArticle,
} from "@/lib/content";
import { createArticleMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type ArticleArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublicArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticleArticlePageProps) {
  const { slug } = await params;
  const article = await getPublicArticleArticle(slug);

  if (!article) return {};
  return createArticleMetadata(article);
}

export default async function ArticleArticlePage({ params }: ArticleArticlePageProps) {
  const { slug } = await params;
  const article = await getPublicArticleArticle(slug);

  if (!article) notFound();

  const related = await getRelatedArticle(slug);

  return (
    <PublicPage>
      <ArticleJsonLd article={article} />
      <article className="article-page">
        <nav className="article-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/article">Article</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{article.title}</span>
        </nav>
        <header className="article-header">
          <p className="meta-line">
            {article.articleId}
          </p>
          <h1>{article.title}</h1>
          {article.subtitle && <p className="article-subtitle">{article.subtitle}</p>}
          <div className="article-byline">
            <span>{article.author}</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>{article.readingTimeMinutes} min read</span>
            <CopyMarkdownButton markdown={article.body} />
          </div>
          {article.topics.length > 0 && (
            <div className="article-topics" aria-label="Topics">
              {article.topics.map((topic) => (
                <Link href={`/topics/${topic.slug}`} key={topic.slug}>{topic.name}</Link>
              ))}
            </div>
          )}
        </header>

        <div className="article-content">
          <ArticleBody body={article.body} title={article.title} />
        </div>

        <footer className="article-footer">
          <span>Article ID / {article.articleId}</span>
          <span>Updated / {formatDate(article.updatedAt)}</span>
        </footer>

        <ArticleRelated articles={related} />
      </article>
    </PublicPage>
  );
}

function formatDate(date: Date | null) {
  if (!date) return "Unpublished";
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
