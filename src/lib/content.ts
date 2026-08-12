import { createDb } from "@/db";
import {
  getPublishedArticle,
  getPublishedArticleBySlug,
  getArticleTopics,
  getPublishedWork,
  getStudioProfile,
} from "@/db/queries";

export type PublicProfile = {
  name: string;
  positioning: string;
  introduction: string;
  principles: string[];
  areasOfWork: string[];
};

export type PublicTopic = { slug: string; name: string };

export type PublicArticle = {
  id: number;
  articleId: string;
  slug: string;
  title: string;
  subtitle: string | null;
  summary: string;
  author: string;
  readingTimeMinutes: number;
  publishedAt: Date | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  topics: PublicTopic[];
};

export type PublicArticleArticle = PublicArticle & {
  body: string;
  updatedAt: Date;
};

export type PublicWork = {
  id: number;
  slug: string;
  type: "open_source" | "project";
  title: string;
  summary: string;
  externalUrl: string | null;
  repositoryUrl: string | null;
  publishedAt: Date | null;
};

const fallbackProfile: PublicProfile = {
  name: "VXNUS",
  positioning: "Technology Creative Studio",
  introduction:
    "Trying the untried and finishing the unfinished. We explore the frontiers of technology, focusing on Artificial Intelligence, AI Companions, and intelligent characters.",
  principles: [
    "Try the untried.",
    "Finish the unfinished.",
    "Breathe life into digital entities.",
    "Merge imagination with intelligent systems.",
    "Push the boundaries of AI interaction.",
  ],
  areasOfWork: [
    "Artificial Intelligence",
    "AI Companions",
    "AI Characters",
    "Interactive Technology",
    "Digital Experiences",
  ],
};

const fallbackArticle: PublicArticle[] = [];

export async function getPublicProfile(): Promise<PublicProfile> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return fallbackProfile;

  const profile = await getStudioProfile(createDb(connectionString));
  return profile ?? fallbackProfile;
}

export async function getPublicArticle(): Promise<PublicArticle[]> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return fallbackArticle;

  const db = createDb(connectionString);
  const articles = await getPublishedArticle(db);
  const publicArticles = await Promise.all(articles.map(async (article) => ({
    id: article.id,
    articleId: article.articleId,
    slug: article.slug,
    title: article.title,
    subtitle: article.subtitle,
    summary: article.summary,
    author: article.author,
    readingTimeMinutes: article.readingTimeMinutes,
    publishedAt: article.publishedAt,
    coverImageUrl: article.coverImageUrl,
    coverImageAlt: article.coverImageAlt,
    topics: await getArticleTopics(db, article.id),
  })));

  return publicArticles.sort((a, b) => b.articleId.localeCompare(a.articleId, undefined, { numeric: true }));
}

export async function getPublicArticleSlugs(): Promise<string[]> {
  const articles = await getPublicArticle();
  return articles.map((article) => article.slug);
}

export async function getPublicArticleArticle(
  slug: string,
): Promise<PublicArticleArticle | null> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  const db = createDb(connectionString);
  const article = await getPublishedArticleBySlug(db, slug);

  if (!article || article.status !== "published") return null;

  return {
    id: article.id,
    articleId: article.articleId,
    slug: article.slug,
    title: article.title,
    subtitle: article.subtitle,
    summary: article.summary,
    author: article.author,
    readingTimeMinutes: article.readingTimeMinutes,
    publishedAt: article.publishedAt,
    coverImageUrl: article.coverImageUrl,
    coverImageAlt: article.coverImageAlt,
    topics: await getArticleTopics(db, article.id),
    body: article.body,
    updatedAt: article.updatedAt,
  };
}

export async function getPublicTopics(): Promise<PublicTopic[]> {
  const articles = await getPublicArticle();
  const topicMap = new Map(articles.flatMap((article) => article.topics).map((topic) => [topic.slug, topic]));
  return [...topicMap.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getPublicArticleByTopic(slug: string): Promise<PublicArticle[]> {
  const articles = await getPublicArticle();
  return articles.filter((article) => article.topics.some((topic) => topic.slug === slug));
}

export async function getRelatedArticle(slug: string): Promise<PublicArticle[]> {
  const articles = await getPublicArticle();
  const currentIndex = articles.findIndex((article) => article.slug === slug);
  if (currentIndex < 0) return articles.slice(0, 2);

  return [articles[currentIndex - 1], articles[currentIndex + 1]].filter(
    (article): article is PublicArticle => Boolean(article),
  );
}

export async function getPublicWork(): Promise<PublicWork[]> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return [];

  const entries = await getPublishedWork(createDb(connectionString));
  return entries.map((entry) => ({
    id: entry.id,
    slug: entry.slug,
    type: entry.type,
    title: entry.title,
    summary: entry.summary,
    externalUrl: entry.externalUrl,
    repositoryUrl: entry.repositoryUrl,
    publishedAt: entry.publishedAt,
  }));
}
