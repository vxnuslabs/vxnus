# Phase 3 Editorial Research

Phase 3 turns the research archive into a durable editorial reading experience.

## Delivered

- Stable article routes at `/research/[slug]`.
- Static generation from published research slugs.
- Dynamic article metadata with canonical URLs, author, publication date, update date, and Open Graph article fields.
- Article JSON-LD using the `Article` schema.
- Plain-text/markdown-like article body rendering into semantic headings, paragraphs, and lists.
- Abstract and key findings sections.
- References and license metadata.
- Related research navigation.
- Research archive links that resolve directly to articles.
- Sitemap entries for all published article slugs.
- 404 handling with the framework-provided `noindex` behavior for unknown article slugs.

## Editorial content contract

The database article body remains text rather than arbitrary HTML. The current renderer supports:

- `## Heading` for section headings.
- Blank lines for paragraph boundaries.
- `- Item` for unordered list items.

This keeps article content portable and avoids rendering unsanitized author HTML. A richer editor format can be added in the admin phase if the editorial workflow requires it.

## Verification

The seeded articles are statically generated during `next build`:

- `/research/beyond-flashcards`
- `/research/marketplace-independence`
- `/research/memory-centric-ai-companions`

The project passes lint, TypeScript, production build, and route-level HTTP checks.

