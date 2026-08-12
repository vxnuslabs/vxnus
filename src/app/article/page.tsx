import { ArchivePage } from "@/components/archive-page";
import { ArticleList } from "@/components/article-list";
import { getPublicArticle } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Article",
  description: "Article and findings from VXNUS.",
  path: "/article",
});

export default async function ArticlePage() {
  const article = await getPublicArticle();

  return (
    <ArchivePage
      title="Article"
      description="Questions investigated through prototypes, evidence, and writing."
    >
      <ArticleList articles={article} />
    </ArchivePage>
  );
}
