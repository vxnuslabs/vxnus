import Link from "next/link";

import { PublicPage } from "@/components/public-page";
import { getPublicTopics } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Article topics",
  description: "Topics explored through VXNUS article and editorial work.",
  path: "/topics",
});

export default async function TopicsPage() {
  const topics = await getPublicTopics();

  return (
    <PublicPage>
      <main className="archive-page">
        <div className="archive-intro">
          <p className="meta-line">VXNUS / Index</p>
          <h1>Article topics</h1>
          <p>Subject areas that recur across the studio&apos;s investigations.</p>
        </div>
        <div className="topic-index">
          {topics.map((topic) => (
            <Link href={`/topics/${topic.slug}`} key={topic.slug}>{topic.name}</Link>
          ))}
        </div>
      </main>
    </PublicPage>
  );
}
