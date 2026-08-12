import { notFound } from "next/navigation";

import { ArchivePage } from "@/components/archive-page";
import { ArticleList } from "@/components/article-list";
import { getPublicArticleByTopic, getPublicTopics } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

type TopicPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const topics = await getPublicTopics();
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = (await getPublicTopics()).find((item) => item.slug === slug);
  if (!topic) return {};

  return createMetadata({
    title: `${topic.name} article`,
    description: `Article from VXNUS on ${topic.name.toLowerCase()}.`,
    path: `/topics/${topic.slug}`,
  });
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = (await getPublicTopics()).find((item) => item.slug === slug);
  if (!topic) notFound();

  const articles = await getPublicArticleByTopic(slug);

  return (
    <ArchivePage
      title={topic.name}
      description={`Article connected to ${topic.name.toLowerCase()}.`}
    >
      <ArticleList articles={articles} />
    </ArchivePage>
  );
}
