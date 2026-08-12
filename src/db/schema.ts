import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, uniqueIndex, timestamp, jsonb } from "drizzle-orm/pg-core";

export const contentStatuses = ["draft", "published", "archived"] as const;
export type ContentStatus = (typeof contentStatuses)[number];

export const workTypes = ["open_source", "project"] as const;
export type WorkType = (typeof workTypes)[number];

const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
};

export const studioProfile = pgTable("studio_profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  positioning: text("positioning").notNull(),
  introduction: text("introduction").notNull(),
  principles: jsonb("principles").$type<string[]>().notNull(),
  areasOfWork: jsonb("areas_of_work").$type<string[]>().notNull(),
  ...timestamps,
});

export const topics = pgTable(
  "topic",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("topic_slug_unique").on(table.slug)],
);

export const workEntries = pgTable(
  "work_entry",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    type: text("type", { enum: workTypes }).notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    body: text("body").notNull(),
    externalUrl: text("external_url"),
    repositoryUrl: text("repository_url"),
    coverImageUrl: text("cover_image_url"),
    coverImageAlt: text("cover_image_alt"),
    status: text("status", { enum: contentStatuses }).notNull().default("draft"),
    publishedAt: timestamp("published_at"),
    ...timestamps,
  },
  (table) => [uniqueIndex("work_entry_slug_unique").on(table.slug)],
);

export const articleArticles = pgTable(
  "article_article",
  {
    id: serial("id").primaryKey(),
    articleId: text("article_id").notNull(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    summary: text("summary").notNull(),
    body: text("body").notNull(),
    author: text("author").notNull(),
    readingTimeMinutes: integer("reading_time_minutes").notNull(),
    coverImageUrl: text("cover_image_url"),
    coverImageAlt: text("cover_image_alt"),
    status: text("status", { enum: contentStatuses }).notNull().default("draft"),
    publishedAt: timestamp("published_at"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("article_article_article_id_unique").on(table.articleId),
    uniqueIndex("article_article_slug_unique").on(table.slug),
  ],
);

export const workTopics = pgTable(
  "work_topic",
  {
    workEntryId: integer("work_entry_id")
      .notNull()
      .references(() => workEntries.id, { onDelete: "cascade" }),
    topicId: integer("topic_id")
      .notNull()
      .references(() => topics.id, { onDelete: "cascade" }),
  },
  (table) => [uniqueIndex("work_topic_unique").on(table.workEntryId, table.topicId)],
);

export const articleTopics = pgTable(
  "article_topic",
  {
    articleArticleId: integer("article_article_id")
      .notNull()
      .references(() => articleArticles.id, { onDelete: "cascade" }),
    topicId: integer("topic_id")
      .notNull()
      .references(() => topics.id, { onDelete: "cascade" }),
  },
  (table) => [uniqueIndex("article_topic_unique").on(table.articleArticleId, table.topicId)],
);

export const workArticleRelations = pgTable(
  "work_article_relation",
  {
    workEntryId: integer("work_entry_id")
      .notNull()
      .references(() => workEntries.id, { onDelete: "cascade" }),
    articleArticleId: integer("article_article_id")
      .notNull()
      .references(() => articleArticles.id, { onDelete: "cascade" }),
  },
  (table) => [uniqueIndex("work_article_unique").on(table.workEntryId, table.articleArticleId)],
);

export const workEntryRelations = relations(workEntries, ({ many }) => ({
  topics: many(workTopics),
  article: many(workArticleRelations),
}));

export const articleArticleRelations = relations(articleArticles, ({ many }) => ({
  topics: many(articleTopics),
  work: many(workArticleRelations),
}));
