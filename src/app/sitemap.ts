import type { MetadataRoute } from "next";

import { getPublicArticleSlugs, getPublicTopics } from "@/lib/content";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const slugs = await getPublicArticleSlugs();
  const topics = await getPublicTopics();
  const staticRoutes = ["/", "/about", "/article", "/topics", "/open-source", "/projects"];

  return [
    ...staticRoutes.map((path) => ({
      url: new URL(path, site.url).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...slugs.map((slug) => ({
      url: new URL(`/article/${slug}`, site.url).toString(),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...topics.map((topic) => ({
      url: new URL(`/topics/${topic.slug}`, site.url).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
