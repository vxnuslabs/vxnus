import { ArchivePage } from "@/components/archive-page";
import { WorkList } from "@/components/work-list";
import { getPublicWork } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Projects",
  description: "Products and validated work from VXNUS.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const work = (await getPublicWork()).filter((entry) => entry.type === "project");

  return (
    <ArchivePage title="Projects" description="Work that has moved from an investigation into something useful.">
      <WorkList work={work} emptyMessage="No projects have been published yet." />
    </ArchivePage>
  );
}
