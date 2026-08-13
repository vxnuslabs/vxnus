import Link from "next/link";

import type { PublicArticle } from "@/lib/content";

export function ArticleList({ articles }: { articles: PublicArticle[] }) {
  if (articles.length === 0) {
    return <p className="empty-state">No article has been published yet.</p>;
  }

  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <article className="article-row" key={article.id}>
          <span className="article-index">VX-26-{articles.length - index}</span>
          <div className="article-copy">
            <p className="meta-line">
              {article.articleId}
            </p>
            <h3>
              <Link className="article-title-link" href={`/article/${article.slug}`}>
                {article.title}
              </Link>
            </h3>
            <p>{article.summary}</p>
            {article.topics.length > 0 && (
              <div className="article-topics" aria-label="Topics">
                {article.topics.map((topic) => <span key={topic.slug}>{topic.name}</span>)}
              </div>
            )}
          </div>
          <div className="article-detail">
            <span>{article.readingTimeMinutes} min read</span>
            <Link href={`/article/${article.slug}`} aria-label={`Read ${article.title}`}>
              Read article <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
