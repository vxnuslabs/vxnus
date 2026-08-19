import type { PublicWorkEntry } from "@/lib/content";
import { site } from "@/lib/site";

export function WorkJsonLd({ work }: { work: PublicWorkEntry }) {
  const isProject = work.type === "project";
  const section = isProject ? "projects" : "open-source";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": isProject ? "CreativeWork" : "SoftwareSourceCode",
        "@id": `${site.url}/${section}/${work.slug}#work`,
        name: work.title,
        headline: work.title,
        description: work.summary,
        url: `${site.url}/${section}/${work.slug}`,
        datePublished: work.publishedAt?.toISOString(),
        dateModified: work.updatedAt.toISOString(),
        author: {
          "@type": "Person",
          name: site.founder.name,
          url: site.founder.url,
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
        mainEntityOfPage: `${site.url}/${section}/${work.slug}`,
        ...(work.repositoryUrl && { codeRepository: work.repositoryUrl }),
        ...(work.externalUrl && { url: work.externalUrl }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "VXNUS", item: site.url },
          { "@type": "ListItem", position: 2, name: isProject ? "Projects" : "Open Source", item: `${site.url}/${section}` },
          { "@type": "ListItem", position: 3, name: work.title, item: `${site.url}/${section}/${work.slug}` },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
