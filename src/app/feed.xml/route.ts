import { getPublicArticle } from "@/lib/content";
import { site } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const articles = await getPublicArticle();
  const items = articles
    .map(
      (article) => `<item>
        <title>${escapeXml(article.title)}</title>
        <link>${site.url}/article/${article.slug}</link>
        <guid isPermaLink="true">${site.url}/article/${article.slug}</guid>
        <description>${escapeXml(article.summary)}</description>
        <pubDate>${article.publishedAt?.toUTCString() ?? ""}</pubDate>
      </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${site.name} Article</title>
        <link>${site.url}/article</link>
        <description>Article and findings from ${site.name}.</description>
        <language>en</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

