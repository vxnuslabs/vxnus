import { getPublicArticle } from "@/lib/content";
import { site } from "@/lib/site";

export async function GET() {
  const articles = await getPublicArticle();
  const article = articles
    .map(
      (article) =>
        `- [${article.title}](${site.url}/article/${article.slug}): ${article.summary}`,
    )
    .join("\n");

  const body = `# ${site.name}

> ${site.description}

${site.name} is a Technology Creative Studio. It focuses on trying the untried and finishing the unfinished, with a deep focus on technology like AI, AI Companions, and AI Characters.

## Public sections

- [Home](${site.url}/): Studio profile and selected work.
- [About](${site.url}/about): Studio principles and areas of work.
- [Article](${site.url}/article): Published article archive.
- [Article topics](${site.url}/topics): Topic index for the article archive.
- [Open source](${site.url}/open-source): Open-source tools and systems.
- [Projects](${site.url}/projects): Validated work and products.

## Article

${article}

## Machine-readable feeds

- [RSS feed](${site.url}/feed.xml)
- [Sitemap](${site.url}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
