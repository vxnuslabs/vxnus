import { site } from "@/lib/site";

export function SiteJsonLd() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      description: site.description,
      url: site.url,
      founder: {
        "@type": "Person",
        name: site.founder.name,
        url: site.founder.url,
        sameAs: [site.founder.url],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      description: site.description,
      url: site.url,
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
