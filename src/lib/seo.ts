import type { Metadata } from "next";

import type { PublicArticleArticle } from "./content";
import { site } from "./site";

export function createMetadata(input: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = new URL(input.path ?? "/", site.url);

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}

export function createArticleMetadata(article: PublicArticleArticle): Metadata {
  const metadata = createMetadata({
    title: article.title,
    description: article.summary,
    path: `/article/${article.slug}`,
  });

  return {
    ...metadata,
    authors: [{ name: article.author, url: site.founder.url }],
    category: "Article",
    keywords: article.topics.map((topic) => topic.name),
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [article.author],
      section: "Article",
      images: [
        {
          url: article.coverImageUrl ?? "/opengraph-image.png",
          alt: article.coverImageAlt ?? `${article.title} — VXNUS article`,
        },
      ],
    },
  };
}
