import { getAllArticle, getArticleTopics } from "@/db/queries";
import { createDb } from "@/db";
import { getPublicArticle, getPublicArticleArticle, type PublicArticleArticle } from "@/lib/content";

export type AdminArticleSummary = {
  id: number;
  articleId: string;
  slug: string;
  title: string;
  status: "draft" | "published" | "archived";
  updatedAt: Date;
};

export type AdminArticleArticle = Omit<PublicArticleArticle, "topics"> & {
  status: "draft" | "published" | "archived";
  topics: { slug: string; name: string }[];
};

export async function getAdminArticle(): Promise<AdminArticleSummary[]> {
  const connectionString = process.env.DATABASE_URL;
  if (connectionString) {
    const entries = await getAllArticle(createDb(connectionString));
    return entries.map((entry) => ({
      id: entry.id,
      articleId: entry.articleId,
      slug: entry.slug,
      title: entry.title,
      status: entry.status,
      updatedAt: entry.updatedAt,
    }));
  }

  const entries = await getPublicArticle();
  return entries.map((entry) => ({
    id: entry.id,
    articleId: entry.articleId,
    slug: entry.slug,
    title: entry.title,
    status: "published",
    updatedAt: entry.publishedAt ?? new Date(),
  }));
}

export async function getAdminArticleArticle(id: number): Promise<AdminArticleArticle | null> {
  const connectionString = process.env.DATABASE_URL;
  if (connectionString) {
    const db = createDb(connectionString);
    const entries = await getAllArticle(db);
    const summary = entries.find((article) => article.id === id);
    if (!summary) return null;

    return {
      id: summary.id,
      articleId: summary.articleId,
      slug: summary.slug,
      title: summary.title,
      subtitle: summary.subtitle,
      summary: summary.summary,
      author: summary.author,
      readingTimeMinutes: summary.readingTimeMinutes,
      publishedAt: summary.publishedAt,
      coverImageUrl: summary.coverImageUrl,
      coverImageAlt: summary.coverImageAlt,
      status: summary.status,
      topics: await getArticleTopics(db, summary.id),
      body: summary.body,
      updatedAt: summary.updatedAt,
    };
  }

  const articles = await getPublicArticle();
  const summary = articles.find((article) => article.id === id);
  if (!summary) return null;
  
  const publicArticle = await getPublicArticleArticle(summary.slug);
  if (!publicArticle) return null;

  return { ...publicArticle, status: "published" as const };
}

export type AdminWorkSummary = {
  id: number;
  slug: string;
  type: "open_source" | "project";
  title: string;
  status: "draft" | "published" | "archived";
  updatedAt: Date;
};

export async function getAdminWork(): Promise<AdminWorkSummary[]> {
  const connectionString = process.env.DATABASE_URL;
  if (connectionString) {
    const { getAllWork } = await import("@/db/queries");
    const entries = await getAllWork(createDb(connectionString));
    return entries.map((entry) => ({
      id: entry.id,
      slug: entry.slug,
      type: entry.type as "open_source" | "project",
      title: entry.title,
      status: entry.status as "draft" | "published" | "archived",
      updatedAt: entry.updatedAt,
    }));
  }

  const { getPublicWork } = await import("@/lib/content");
  const entries = await getPublicWork();
  return entries.map((entry) => ({
    id: entry.id,
    slug: entry.slug,
    type: entry.type as "open_source" | "project",
    title: entry.title,
    status: "published",
    updatedAt: entry.publishedAt ?? new Date(),
  }));
}

export type AdminWorkEntry = {
  id: number;
  slug: string;
  type: "open_source" | "project";
  title: string;
  summary: string;
  body: string;
  externalUrl: string | null;
  repositoryUrl: string | null;
  status: "draft" | "published" | "archived";
};

export async function getAdminWorkEntry(id: number): Promise<AdminWorkEntry | null> {
  const connectionString = process.env.DATABASE_URL;
  if (connectionString) {
    const { getAllWork } = await import("@/db/queries");
    const db = createDb(connectionString);
    const entries = await getAllWork(db);
    const summary = entries.find((work) => work.id === id);
    if (!summary) return null;

    return {
      id: summary.id,
      slug: summary.slug,
      type: summary.type as "open_source" | "project",
      title: summary.title,
      summary: summary.summary,
      body: summary.body,
      externalUrl: summary.externalUrl,
      repositoryUrl: summary.repositoryUrl,
      status: summary.status as "draft" | "published" | "archived",
    };
  }

  const { getPublicWork, getPublicWorkEntry } = await import("@/lib/content");
  const works = await getPublicWork();
  const summary = works.find((work) => work.id === id);
  if (!summary) return null;
  
  const publicWork = await getPublicWorkEntry(summary.slug);
  if (!publicWork) return null;

  return { 
    id: publicWork.id,
    slug: publicWork.slug,
    type: publicWork.type as "open_source" | "project",
    title: publicWork.title,
    summary: publicWork.summary,
    body: publicWork.body,
    externalUrl: publicWork.externalUrl ?? null,
    repositoryUrl: publicWork.repositoryUrl ?? null,
    status: "published",
  };
}
