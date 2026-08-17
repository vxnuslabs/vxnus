import { ArchivePage } from "@/components/archive-page";
import { WorkList } from "@/components/work-list";
import { GithubIcon } from "@/components/github-icon";
import { getPublicWork } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Open source",
  description: "Open-source work and tools from VXNUS.",
  path: "/open-source",
});

export default async function OpenSourcePage() {
  const work = (await getPublicWork()).filter((entry) => entry.type === "open_source");

  return (
    <ArchivePage title="Open source" description="Tools and systems shared for others to inspect and use.">
      <div style={{ marginBottom: "2.5rem", marginTop: "-0.5rem" }}>
        <a
          href={site.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="opensource-github-banner"
          aria-label="Visit vxnuslabs on GitHub"
        >
          <GithubIcon size={16} />
          <span>{site.github.name} on GitHub ↗</span>
        </a>
      </div>
      <WorkList work={work} emptyMessage="No open-source work has been published yet." />
    </ArchivePage>
  );
}

