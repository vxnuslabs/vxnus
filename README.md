# VXNUS

VXNUS is a technology creative studio. The public site presents the studio, its work, and its findings. The private admin workspace maintains that content.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Quality checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Data and D1

The application uses Drizzle ORM with Cloudflare D1/SQLite.

```bash
npm run db:generate
npm run db:setup
```

`db:setup` applies migrations to local D1 and loads the seed file. The remote migration command is intentionally separate:

```bash
npm run db:migrate:remote
```

Replace the placeholder `database_id` in `wrangler.toml` before using the remote command.

## Admin workspace

Set these environment variables:

```bash
NEXT_PUBLIC_SITE_URL=https://vxnus.krzgn.xyz
ADMIN_PASSWORD=...
ADMIN_SESSION_SECRET=...
```

Then visit `/admin/login`. The deployed runtime must expose the Cloudflare D1 binding as `DB` for mutations.

See the phase documentation in `docs/` for the content model, editorial rules, deployment notes, and release checklist.
