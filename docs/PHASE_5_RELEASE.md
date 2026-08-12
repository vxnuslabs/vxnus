# Phase 5 Release Hardening

Phase 5 prepares VXNUS for a controlled production release. It verifies the public editorial site, protects the admin surface, and documents the Cloudflare D1 operating workflow.

## Delivered in the application

- Generated `robots.txt` allowing public pages and excluding `/admin/` and `/api/`.
- Generated sitemap containing public routes and published research URLs.
- Generated RSS feed at `/feed.xml` and an AI-readable site index at `/llms.txt`.
- Site-level `Organization` and `WebSite` JSON-LD.
- Canonical metadata, Open Graph metadata, and Article JSON-LD.
- Security response headers: content-type sniffing protection, frame protection, referrer policy, permissions policy, and cross-origin opener policy.
- Global focus-visible styling and reduced-motion behavior.
- Public and protected loading states.
- Route-level and global error states.
- Non-indexable metadata on admin routes.
- Separate local and remote D1 migration commands.

## Required production configuration

Before deployment, replace the placeholder D1 ID in `wrangler.toml` and configure:

- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `NEXT_PUBLIC_SITE_URL` with the canonical production origin
- Cloudflare D1 binding `DB`

The admin password should be long and randomly generated. The session secret should be independent, long, and rotated deliberately.

## D1 release workflow

1. Generate and review a migration locally:

   ```bash
   npm run db:generate
   ```

2. Apply and test against local D1:

   ```bash
   npm run db:setup
   ```

3. Run the application checks:

   ```bash
   npm run lint
   npx tsc --noEmit
   npm run build
   ```

4. Export a remote backup before applying production migrations:

   ```bash
   mkdir -p backups
   wrangler d1 export vxnus --remote --output=backups/vxnus-YYYY-MM-DD.sql
   ```

5. Apply the reviewed migration:

   ```bash
   npm run db:migrate:remote
   ```

6. Verify the public article and admin login flow against the deployed origin.

The local D1 workflow has been verified in this repository: migrations and seed data apply successfully, and the seeded `VR-24-05` article is queryable as `published`.

Never apply an unreviewed migration directly to the production database. Keep exports outside version control unless they are explicitly sanitized and intended as fixtures.

## Release verification checklist

### Public

- `/` returns 200 and identifies VXNUS as a research studio.
- `/research` lists only published entries.
- Each published `/research/[slug]` page has a canonical URL, title, description, Article JSON-LD, and readable body.
- Unknown article slugs return 404 and `noindex`.
- `/robots.txt` excludes admin routes and points to `/sitemap.xml`.
- `/sitemap.xml` contains only public URLs.
- `/feed.xml` and `/llms.txt` expose the public editorial corpus in machine-readable form.
- Keyboard focus is visible and reduced-motion preferences are respected.

### Admin

- Unauthenticated requests to `/admin/*` redirect to `/admin/login`.
- Admin routes are not indexable.
- An authorized editor can create a draft, preview it, publish it, unpublish it, and archive it.
- Draft and archived records do not appear in public lists, article routes, or the sitemap.
- Invalid form input returns an actionable error without writing content.
- Missing D1 configuration fails visibly rather than reporting a false save.

## Known environment boundary

The repository can build and verify route/auth behavior locally without Cloudflare credentials. The final mutation and remote migration checks require a real D1 binding and configured admin secrets; those are deployment-state checks, not values that should be committed to the repository.
