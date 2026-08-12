import type { PublicArticleArticle } from "@/lib/content";
import { site } from "@/lib/site";

export function ArticleJsonLd({ article }: { article: PublicArticleArticle }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${site.url}/article/${article.slug}#article`,
        headline: article.title,
        description: article.summary,
        image: article.coverImageUrl?.startsWith("http")
          ? article.coverImageUrl
          : `${site.url}${article.coverImageUrl ?? "/opengraph-image.png"}`,
        author: {
          "@type": "Person",
          name: site.founder.name,
          url: site.founder.url,
          sameAs: [site.founder.url],
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
          founder: {
            "@type": "Person",
            name: site.founder.name,
            url: site.founder.url,
          },
        },
        datePublished: article.publishedAt?.toISOString(),
        dateModified: article.updatedAt.toISOString(),
        mainEntityOfPage: `${site.url}/article/${article.slug}`,
        identifier: article.articleId,
        articleSection: "Article",
        keywords: article.topics.map((topic) => topic.name),
        about: article.topics.map((topic) => ({ "@type": "Thing", name: topic.name })),
        wordCount: article.body.split(/\s+/).filter(Boolean).length,
        timeRequired: `PT${article.readingTimeMinutes}M`,
        inLanguage: "en",
        isAccessibleForFree: true,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "VXNUS", item: site.url },
          { "@type": "ListItem", position: 2, name: "Article", item: `${site.url}/article` },
          { "@type": "ListItem", position: 3, name: article.title, item: `${site.url}/article/${article.slug}` },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
