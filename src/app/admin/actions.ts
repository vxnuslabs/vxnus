"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createArticleDraft,
  createWorkEntryDraft,
  setArticleStatus,
  updateArticleDraft,
} from "@/db/queries";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminDatabase } from "@/lib/admin-db";
import matter from "gray-matter";

export type AdminActionState = { message?: string; error?: string } | undefined;

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function listField(formData: FormData, name: string) {
  return field(formData, name)
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
}

function topicFieldFromList(names: string[]) {
  return names.map((name) => ({
    name,
    slug: name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-"),
  })).filter((topic) => topic.slug);
}

function revalidateArticlePaths(slug: string) {
  revalidatePath("/", "page");
  revalidatePath("/article", "page");
  revalidatePath(`/article/${slug}`);
}

function articleInput(formData: FormData) {
  const rawContent = field(formData, "rawContent");
  if (!rawContent) return { error: "Content is required." as const };

  let parsed;
  try {
    parsed = matter(rawContent);
  } catch (e) {
    return { error: "Failed to parse Markdown frontmatter." as const };
  }

  const data = parsed.data;
  let topics: string[] = [];
  if (Array.isArray(data.topics)) {
    topics = data.topics.map(String);
  } else if (typeof data.topics === "string") {
    topics = data.topics.split("\n").map(s => s.trim()).filter(Boolean);
  }

  const input = {
    articleId: String(data.articleId || ""),
    slug: String(data.slug || ""),
    title: String(data.title || ""),
    subtitle: data.subtitle ? String(data.subtitle) : "",
    summary: String(data.summary || ""),
    body: parsed.content.trim(),
    author: String(data.author || "Kur Zagin"),
    topics: topicFieldFromList(topics),
    coverImageUrl: data.coverImageUrl ? String(data.coverImageUrl) : "",
    coverImageAlt: data.coverImageAlt ? String(data.coverImageAlt) : "",
    readingTimeMinutes: Number(data.readingTimeMinutes),
  };

  if (
    !input.articleId ||
    !input.slug ||
    !input.title ||
    !input.summary ||
    !input.body ||
    !input.author ||
    !Number.isInteger(input.readingTimeMinutes) ||
    input.readingTimeMinutes < 1
  ) {
    return { error: "Complete all required fields in the frontmatter before saving." as const };
  }

  return { input };
}

export async function saveArticle(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const parsed = articleInput(formData);
  if ("error" in parsed) return parsed;

  let result: { id: number; slug: string } | undefined;
  try {
    const db = getAdminDatabase();
    const id = Number(field(formData, "id"));
    result = id ? await updateArticleDraft(db, id, parsed.input) : await createArticleDraft(db, parsed.input);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "The article could not be saved." };
  }

  if (!result) return { error: "The article could not be saved." };
  revalidateArticlePaths(result.slug);
  redirect(`/admin/article/${result.id}/edit?saved=1`);
}

export async function changeArticleStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(field(formData, "id"));
  const status = field(formData, "status");

  if (!Number.isInteger(id) || !["draft", "published", "archived"].includes(status)) {
    redirect("/admin/content?error=invalid-status");
  }

  let result: { id: number; slug: string; status: "draft" | "published" | "archived" } | undefined;
  try {
    result = await setArticleStatus(getAdminDatabase(), id, status as "draft" | "published" | "archived");
  } catch {
    redirect("/admin/content?error=database");
  }

  if (result) revalidateArticlePaths(result.slug);
  redirect(result?.status === "published" ? "/admin/content?saved=published" : "/admin/content?saved=updated");
}

export async function changeWorkStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(field(formData, "id"));
  const status = field(formData, "status");

  if (!Number.isInteger(id) || !["draft", "published", "archived"].includes(status)) {
    redirect("/admin/content?error=invalid-status");
  }

  let result: { id: number; slug: string; status: "draft" | "published" | "archived" } | undefined;
  try {
    const { setWorkStatus } = await import("@/db/queries");
    result = await setWorkStatus(getAdminDatabase(), id, status as "draft" | "published" | "archived");
  } catch {
    redirect("/admin/content?error=database");
  }

  if (result) {
    revalidatePath("/projects", "page");
    revalidatePath("/open-source", "page");
  }
  redirect(result?.status === "published" ? "/admin/content?saved=published" : "/admin/content?saved=updated");
}

export async function saveWorkEntry(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  await requireAdmin();
  const rawContent = field(formData, "rawContent");
  if (!rawContent) return { error: "Content is required." };

  let parsed;
  try {
    parsed = matter(rawContent);
  } catch (e) {
    return { error: "Failed to parse Markdown frontmatter." };
  }

  const data = parsed.data;

  const input = {
    slug: String(data.slug || ""),
    type: String(data.type || "") as "open_source" | "project",
    title: String(data.title || ""),
    summary: String(data.summary || ""),
    body: parsed.content.trim(),
    externalUrl: data.externalUrl ? String(data.externalUrl) : "",
    repositoryUrl: data.repositoryUrl ? String(data.repositoryUrl) : "",
  };

  if (!input.slug || !input.title || !input.summary || !input.body || !["open_source", "project"].includes(input.type)) {
    return { error: "Complete all required fields in the frontmatter before saving." };
  }

  let result: { id: number; slug: string } | undefined;
  try {
    const id = Number(field(formData, "id"));
    const { createWorkEntryDraft, updateWorkEntryDraft } = await import("@/db/queries");
    result = id ? await updateWorkEntryDraft(getAdminDatabase(), id, input) : await createWorkEntryDraft(getAdminDatabase(), input);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "The work entry could not be saved." };
  }

  if (!result) return { error: "The work entry could not be saved." };
  redirect(`/admin/work/${result.id}/edit?saved=1`);
}
