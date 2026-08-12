# VXNUS SEO and Editorial Rules

## Editorial voice

Write with restraint. Prefer specific observations over broad claims and evidence over confidence.

Use language such as:

- “We explored.”
- “We tested.”
- “We found.”
- “We were wrong.”
- “We improved.”

Avoid hype, urgency, empty superlatives, “transform your workflow” language, and claims that cannot be supported by the work.

## Page titles and descriptions

- Every public route has a unique title and description.
- Titles lead with the actual subject, followed by `— VXNUS` where useful.
- Descriptions summarize the page; they do not sell it.
- Article titles and descriptions should match the visible editorial content.

## URL rules

- Use lowercase, readable, stable slugs.
- Prefer `/research/[slug]` for articles.
- Use canonical URLs for every indexable page.
- Preserve redirects when a published slug changes.

## Structured data

Use semantic structured data where it accurately describes the page:

- `Organization` for the studio identity.
- `Article` for research articles.
- `BreadcrumbList` for nested public routes.
- `WebSite` when useful for site-level discovery.

Do not add schema only to increase markup volume. Structured data must match visible content.

## Technical SEO

- Generate a sitemap from published content only.
- Keep drafts and admin routes out of search indexes.
- Provide `robots.txt` with the intended crawl rules.
- Use descriptive image alt text; use empty alt text for purely decorative images.
- Use semantic headings in a logical order.
- Ensure article content is available in the initial server-rendered response where practical.
- Add RSS for the research archive if it remains useful to the editorial workflow.

## No-CTA policy

The site may provide ordinary navigation, article sharing, references, downloads, and contact information. These should be presented as useful functions, not conversion prompts.

Avoid labels such as:

- Get started
- Book a demo
- Join now
- Learn more as a generic sales prompt
- Subscribe for growth or urgency

Navigation links should describe their destination directly: `Research`, `About`, `Experiments`, `Publications`, or `Contact`.

