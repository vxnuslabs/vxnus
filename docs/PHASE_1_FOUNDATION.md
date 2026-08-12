# Phase 1 Foundation

Phase 1 establishes the database and application primitives needed by the public studio profile, editorial archive, and admin dashboard.

## Database

- Runtime adapter: Drizzle ORM for Cloudflare D1.
- SQL dialect: SQLite.
- Schema source: `src/db/schema.ts`.
- Generated migrations: `drizzle/`.
- Cloudflare binding: `DB` in `wrangler.toml`.

The committed D1 ID is a local placeholder. Replace it with the real D1 database ID before deploying.

## Local setup

Wrangler must be installed or available in the development environment. Then run:

```bash
npm run db:generate
npm run db:setup
```

`db:setup` applies migrations to the local D1 emulator and loads `drizzle/seed.sql`.

For a remote database, apply migrations deliberately with the appropriate Wrangler environment rather than using the local setup command.

## Application primitives

- `src/db/index.ts` creates a typed Drizzle client from a D1 binding.
- `src/db/queries.ts` contains the first read queries for studio profile, published research, and published work.
- `src/lib/site.ts` is the single source for site identity and origin.
- `src/lib/seo.ts` creates consistent page metadata and canonical URLs.
- `src/components/public-shell.tsx` and `src/components/admin-shell.tsx` are shared layout boundaries for later phases.
- `src/app/error.tsx` and `src/app/not-found.tsx` provide calm system states.

## Verification

The foundation currently passes:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

