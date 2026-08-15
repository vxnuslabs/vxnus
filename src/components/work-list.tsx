import Link from "next/link";

import type { PublicWork } from "@/lib/content";

export function WorkList({ work, emptyMessage }: { work: PublicWork[], emptyMessage: string }) {
  if (work.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="article-list">
      {work.map((item, index) => (
        <article className="article-row" key={item.id}>
          <span className="article-index">{String(index + 1).padStart(2, "0")}</span>
          <div className="article-copy">
            <h3>
              {item.externalUrl ? (
                <a className="article-title-link" href={item.externalUrl} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              ) : item.repositoryUrl ? (
                <a className="article-title-link" href={item.repositoryUrl} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              ) : (
                <span className="article-title-link">{item.title}</span>
              )}
            </h3>
            <p>{item.summary}</p>
          </div>
          <div className="article-detail">
            {item.repositoryUrl && (
              <a href={item.repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} source code`}>
                Source Code <span aria-hidden="true">→</span>
              </a>
            )}
            {item.externalUrl && !item.repositoryUrl && (
              <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} external link`}>
                View link <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
