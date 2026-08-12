# VXNUS Content Model

This is the initial content model for the public studio profile and editorial research site. It is intentionally small; new types should be added only when they represent a real publishing need.

## Shared fields

All publishable entries should have:

- `id` — stable internal identifier.
- `slug` — unique, readable URL segment.
- `title` — public title.
- `summary` — short plain-language description.
- `status` — `draft`, `published`, or `archived`.
- `publishedAt` — nullable until publication.
- `createdAt` and `updatedAt` — timestamps.

Draft content must not appear in public queries, sitemap output, feeds, related content, or structured data.

## Studio profile

One maintained profile record for the VXNUS identity:

- Name and short description.
- Long-form introduction.
- Principles.
- Areas of work.
- Contact details or external references, only where useful.

The profile is content, not a campaign page. Avoid fields that imply conversion goals, such as button labels, promotional taglines, or lead scores.

## Work entry

Used for experiments, publications, open-source projects, and other studio work:

- `type` — `experiment`, `publication`, `open_source`, or `project`.
- Title and summary.
- Body or notes.
- Optional external URL and repository URL.
- Topics/tags.
- Cover image and alt text, when an image adds information.
- Date or date range.

## Research article

Used for the long-form editorial archive:

- Research ID, such as `VR-24-05`.
- Title, subtitle, abstract, and body.
- Author or lab attribution.
- Published date and updated date.
- Estimated reading time.
- Topics/tags.
- Key findings.
- References and related work.
- Optional downloadable paper metadata.
- License.
- Cover image and descriptive alt text.

Articles should support headings, paragraphs, lists, quotations, code or data excerpts where relevant, and links. The editor format should preserve semantic structure rather than storing presentation-heavy markup.

## Taxonomy

Use a shared topic/tag vocabulary across work entries and research articles. Taxonomy exists for discovery and related content, not for decorative filtering.

## Relationships

- A work entry may relate to many research articles.
- A research article may relate to many work entries.
- Articles may reference other articles.
- Related content should be selected by explicit editorial relationship first, topic similarity second.

## Publishing rules

- Every public entry needs a title, summary, slug, type, and published date.
- Every article needs an abstract and readable body content.
- Slugs remain stable after publication; changes require redirects.
- Archive content instead of deleting it when it has an established public URL.
- No placeholder entries should be indexed.

