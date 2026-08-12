# VXNUS Implementation Phases

## Product definition

VXNUS is a creative technology research studio and company profile. The public site presents the studio, its work, and its thinking through calm editorial pages and research articles.

The site is not designed as a conversion funnel. It should not depend on calls to action, promotional language, urgency, exaggerated claims, or decorative interface elements that do not help someone understand the work.

The primary public outcomes are:

- Understand what VXNUS is.
- Browse current and past research.
- Read complete editorial articles comfortably.
- Discover experiments, publications, projects, and studio notes.
- Share and index useful work.

The primary internal outcome is:

- Give the studio a small, dependable admin surface for writing and managing content.

## Guiding constraints

- Tone: humble, curious, precise, evidence-led.
- Visual language: monochrome, editorial, technical, calm.
- Content leads the design.
- No CTA buttons or conversion-focused sections.
- Public pages must be useful without requiring JavaScript where practical.
- Articles must be readable, linkable, crawlable, and shareable.
- Admin pages are functional and private; they do not need to mirror the public visual treatment.
- Persistence uses Cloudflare D1 (SQLite) with Drizzle ORM.

## Phase 0 — Foundation and decisions

### Purpose

Turn the brand brief and UI references into a small, explicit product contract before implementation.

### Work

- Confirm the public information architecture.
- Define content types, statuses, slugs, and publishing rules.
- Decide the initial article format and image handling approach.
- Establish typography, spacing, color, borders, and responsive rules from the reference assets.
- Remove starter-template assumptions from the project plan.

### Deliverables

- Public route map.
- Admin route map.
- Content model documented in `docs/CONTENT_MODEL.md`.
- SEO and editorial rules documented in `docs/SEO_AND_EDITORIAL.md`.
- Initial design tokens and component inventory.

### Complete when

The team can describe every first-release page, its source data, and its publishing behavior without inventing requirements during implementation.

## Phase 1 — Data layer and application foundation

### Purpose

Create the smallest reliable foundation for local development and Cloudflare deployment.

### Work

- Configure Drizzle for SQLite/D1.
- Add the initial schema and migrations.
- Add a typed database access layer.
- Define environment configuration for local SQLite and remote D1.
- Add seed data for one studio profile and representative editorial entries.
- Establish shared layout, typography, metadata helpers, error states, and not-found states.

### Deliverables

- Drizzle schema and migration files.
- Database client and repository/query functions.
- Seed command or script.
- Shared public and admin layout primitives.

### Complete when

The application can create, read, update, and publish representative content against a local SQLite database, with the same schema intended for D1.

## Phase 2 — Public studio profile

### Purpose

Present VXNUS clearly as a studio/company without turning the homepage into a marketing landing page.

### Work

- Build the homepage with a restrained studio introduction.
- Add sections for selected research, experiments, publications, open source, and projects where content exists.
- Add an about/studio page based on the brand identity document.
- Add simple archive and filtering/navigation patterns only where they improve discovery.
- Use real content hierarchy rather than reproducing every element in the UI reference images.

### Deliverables

- Homepage.
- Studio/about page.
- Public index pages for supported content types.
- Responsive desktop and mobile layouts.

### Complete when

A visitor can understand VXNUS in one quiet, coherent visit and browse its work without encountering sales prompts or empty decorative sections.

## Phase 3 — Editorial research articles

### Purpose

Make research the strongest and most durable part of the site.

### Work

- Build article listing and detail routes.
- Support title, summary, abstract, body, author/lab, date, reading time, topics, references, and related work.
- Add article typography for long-form reading.
- Add table of contents or section navigation when article length warrants it.
- Add canonical URLs, Open Graph metadata, Article JSON-LD, sitemap inclusion, and RSS if appropriate.
- Add useful previous/next or related-article navigation without CTA treatment.

### Deliverables

- Research archive.
- Article detail template.
- At least one complete seeded article.
- Social preview and structured-data metadata.

### Complete when

An article has a stable canonical URL, renders well on mobile and desktop, is readable without visual noise, and exposes correct metadata to search engines and link previews.

## Phase 4 — Admin dashboard

### Purpose

Provide a practical private workspace for maintaining the public site.

### Work

- Add authentication before exposing mutation routes.
- Build dashboard overview with publishing/status counts.
- Add content list pages with search, type, status, and date visibility.
- Add create/edit forms for studio entries and research articles.
- Support draft, scheduled if needed, published, and archived states.
- Add slug validation, preview, publish/unpublish, and safe deletion/archive behavior.
- Add validation and clear error/success states.

### Deliverables

- Protected admin shell.
- Dashboard overview.
- Content management screens.
- Article editor with preview.
- Publish workflow.

### Complete when

An authorized editor can create a draft, preview it, publish it, edit it, and remove it from public indexes without direct database access.

## Phase 5 — Quality, SEO, and deployment

### Purpose

Make the site dependable, discoverable, and ready for real editorial use.

### Work

- Verify metadata, canonical URLs, robots rules, sitemap, and structured data.
- Verify headers, semantic HTML, keyboard navigation, focus states, and contrast.
- Test public routes, article rendering, admin authorization, and publishing behavior.
- Optimize images, fonts, caching, and database queries.
- Run production build and deployment checks for D1/Cloudflare.
- Add backup/export guidance for editorial content.

### Deliverables

- SEO validation checklist.
- Accessibility and responsive QA pass.
- Production deployment configuration.
- Operational notes for migrations, seeds, and backups.

### Complete when

The public site is crawlable and accessible, the admin workflow is protected, the database is deployable to D1, and the core publishing flow has been verified end to end.

## Deliberately out of scope for the first release

- Newsletter funnels or aggressive subscription prompts.
- Marketing CTAs, lead capture, or conversion analytics.
- Complex CMS collaboration features.
- Comments, reactions, or social feeds.
- Reproducing every dashboard/control visible in the UI reference images.
- Multiple product identities before the core studio and research model is stable.

## Phase order

```text
Product contract
      ↓
Database + application foundation
      ↓
Public studio profile
      ↓
Editorial research
      ↓
Protected admin publishing
      ↓
SEO, accessibility, QA, deployment
```

