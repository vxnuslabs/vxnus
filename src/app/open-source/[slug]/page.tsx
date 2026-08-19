import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/article-body";
import { CopyMarkdownButton } from "@/components/copy-markdown-button";
import { GithubIcon } from "@/components/github-icon";
import { PublicPage } from "@/components/public-page";
import { WorkJsonLd } from "@/components/work-json-ld";
import {
  getPublicWorkEntry,
  getPublicWorkSlugs,
} from "@/lib/content";

export const dynamic = "force-dynamic";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublicWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = await getPublicWorkEntry(slug);

  if (!work) return {};
  
  const { createMetadata } = await import("@/lib/seo");
  return createMetadata({
    title: work.title,
    description: work.summary,
    path: `/open-source/${work.slug}`,
  });
}

export default async function OpenSourceEntryPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = await getPublicWorkEntry(slug);

  if (!work || work.type !== "open_source") notFound();

  return (
    <PublicPage>
      <WorkJsonLd work={work} />
      <article className="article-page">
        <nav className="article-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/open-source">Open source</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{work.title}</span>
        </nav>
        <header className="article-header">
          <p className="meta-line">
            Open Source
          </p>
          <h1>{work.title}</h1>
          <p className="article-subtitle">{work.summary}</p>
          <div className="article-byline">
            <span>{formatDate(work.publishedAt)}</span>
            <CopyMarkdownButton markdown={work.body} />
          </div>
          <div className="article-topics" style={{ marginTop: "1rem" }}>
            {work.repositoryUrl && (
              <a 
                href={work.repositoryUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                <GithubIcon size={14} />
                <span>Source Code</span>
              </a>
            )}
            {work.externalUrl && (
              <a href={work.externalUrl} target="_blank" rel="noopener noreferrer">View Link</a>
            )}
          </div>
        </header>

        <div className="article-content">
          <ArticleBody body={work.body} title={work.title} />
        </div>

        <footer className="article-footer">
          <span>Updated / {formatDate(work.updatedAt)}</span>
        </footer>
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
