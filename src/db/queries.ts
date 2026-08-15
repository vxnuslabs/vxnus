import { desc, eq } from "drizzle-orm";

import type { Database } from ".";
import { articleArticles, articleTopics, studioProfile, topics, workEntries } from "./schema";

export type TopicInput = { slug: string; name: string };

export type ArticleDraftInput = {
  articleId: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  body: string;
  author: string;
  topics?: TopicInput[];
  coverImageUrl?: string;
  coverImageAlt?: string;
  readingTimeMinutes: number;
};

export type WorkEntryInput = {
  slug: string;
  type: "open_source" | "project";
  title: string;
  summary: string;
  body: string;
  externalUrl?: string;
  repositoryUrl?: string;
};

export async function getStudioProfile(db: Database) {
  return db.select().from(studioProfile).where(eq(studioProfile.id, 1)).limit(1).then(res => res[0]);
}

export function getPublishedArticle(db: Database) {
  return db
    .select()
    .from(articleArticles)
    .where(eq(articleArticles.status, "published"))
    .orderBy(desc(articleArticles.publishedAt));
}

export async function getPublishedArticleBySlug(db: Database, slug: string) {
  return db
    .select()
    .from(articleArticles)
    .where(eq(articleArticles.slug, slug))
    .limit(1)
    .then(res => res[0]);
}

export async function getArticleTopics(db: Database, articleArticleId: number) {
  return db
    .select({ slug: topics.slug, name: topics.name })
    .from(articleTopics)
    .innerJoin(topics, eq(articleTopics.topicId, topics.id))
    .where(eq(articleTopics.articleArticleId, articleArticleId));
}

async function syncArticleTopics(db: Database, articleArticleId: number, input: TopicInput[] = []) {
  await db.delete(articleTopics).where(eq(articleTopics.articleArticleId, articleArticleId));

  for (const topic of input) {
    await db
      .insert(topics)
      .values({ slug: topic.slug, name: topic.name })
      .onConflictDoNothing({ target: topics.slug });

    const [savedTopic] = await db.select({ id: topics.id }).from(topics).where(eq(topics.slug, topic.slug)).limit(1);
    if (savedTopic) {
      await db
        .insert(articleTopics)
        .values({ articleArticleId, topicId: savedTopic.id })
        .onConflictDoNothing();
    }
  }
}

export function getPublishedWork(db: Database) {
  return db
    .select()
    .from(workEntries)
    .where(eq(workEntries.status, "published"))
    .orderBy(desc(workEntries.publishedAt));
}

export async function getPublishedWorkBySlug(db: Database, slug: string) {
  return db
    .select()
    .from(workEntries)
    .where(eq(workEntries.slug, slug))
    .limit(1)
    .then(res => res[0]);
}

export function getAllArticle(db: Database) {
  return db.select().from(articleArticles).orderBy(desc(articleArticles.updatedAt));
}

export function getAllWork(db: Database) {
  return db.select().from(workEntries).orderBy(desc(workEntries.updatedAt));
}

export async function createArticleDraft(db: Database, input: ArticleDraftInput) {
  const { topics: topicInput, ...articleInput } = input;
  const result = await db.insert(articleArticles).values({
    ...articleInput,
    subtitle: input.subtitle || null,
    coverImageUrl: input.coverImageUrl || null,
    coverImageAlt: input.coverImageAlt || null,
    status: "draft",
  }).returning({ id: articleArticles.id, slug: articleArticles.slug }).then(res => res[0]);

  if (result) await syncArticleTopics(db, result.id, topicInput);
  return result;
}

export async function updateArticleDraft(db: Database, id: number, input: ArticleDraftInput) {
  const { topics: topicInput, ...articleInput } = input;
  const result = await db
    .update(articleArticles)
    .set({
      ...articleInput,
      subtitle: input.subtitle || null,
      coverImageUrl: input.coverImageUrl || null,
      coverImageAlt: input.coverImageAlt || null,
      updatedAt: new Date(),
    })
    .where(eq(articleArticles.id, id))
    .returning({ id: articleArticles.id, slug: articleArticles.slug })
    .then(res => res[0]);

  if (result) await syncArticleTopics(db, result.id, topicInput);
  return result;
}

export async function setArticleStatus(db: Database, id: number, status: "draft" | "published" | "archived") {
  return db
    .update(articleArticles)
    .set({
      status,
      publishedAt: status === "published" ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(articleArticles.id, id))
    .returning({ id: articleArticles.id, slug: articleArticles.slug, status: articleArticles.status })
    .then(res => res[0]);
}

export async function createWorkEntryDraft(db: Database, input: WorkEntryInput) {
  return db.insert(workEntries).values({
    ...input,
    externalUrl: input.externalUrl || null,
    repositoryUrl: input.repositoryUrl || null,
    status: "draft",
  }).returning({ id: workEntries.id, slug: workEntries.slug }).then(res => res[0]);
}

export async function setWorkStatus(db: Database, id: number, status: "draft" | "published" | "archived") {
  return db
    .update(workEntries)
    .set({
      status,
      publishedAt: status === "published" ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(workEntries.id, id))
    .returning({ id: workEntries.id, slug: workEntries.slug, status: workEntries.status })
    .then(res => res[0]);
}
