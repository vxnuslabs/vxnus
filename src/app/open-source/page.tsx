import { ArchivePage } from "@/components/archive-page";
import { getPublicWork } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Open source",
  description: "Open-source work and tools from VXNUS.",
  path: "/open-source",
});

export default async function OpenSourcePage() {
  const work = (await getPublicWork()).filter((entry) => entry.type === "open_source");

  return (
    <ArchivePage title="Open source" description="Tools and systems shared for others to inspect and use.">
      <p className="empty-state">
        {work.length > 0 ? "Open-source archive coming into view." : "No open-source work has been published yet."}
      </p>
    </ArchivePage>
  );
}
