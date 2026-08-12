import Link from "next/link";

import type { PublicArticle } from "@/lib/content";

export function ArticleRelated({ articles }: { articles: PublicArticle[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="article-related" aria-labelledby="related-article">
      <div className="section-topline">
        <h2 id="related-article">Continue reading</h2>
        <Link href="/article">All article <span aria-hidden="true">→</span></Link>
      </div>
      <div className="related-list">
        {articles.map((article) => (
          <Link className="related-row" href={`/article/${article.slug}`} key={article.id}>
            <span>{article.articleId}</span>
            <strong>{article.title}</strong>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

