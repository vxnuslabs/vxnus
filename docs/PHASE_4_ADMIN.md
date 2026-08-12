# Phase 4 Admin Dashboard

Phase 4 adds a private editorial workspace for maintaining VXNUS research and studio work.

## Access model

- Admin routes are protected by `src/proxy.ts` before rendering.
- The protected admin layout calls `requireAdmin()` again on the server.
- Every mutation action repeats the authorization check.
- Sessions use an HTTP-only, same-site cookie signed with `ADMIN_SESSION_SECRET`.
- Sessions expire after eight hours.
- Login is deliberately a single-editor password gate for the first release. A multi-user provider can replace this boundary later without changing the content model.

Set these variables before using the workspace:

```bash
ADMIN_PASSWORD=replace-with-a-long-random-password
ADMIN_SESSION_SECRET=replace-with-a-long-random-secret
```

## Routes

- `/admin/login` — private workspace login.
- `/admin` — publishing overview and content counts.
- `/admin/content` — searchable research archive with status and update visibility.
- `/admin/research/new` — create a research draft.
- `/admin/research/[id]/edit` — edit a research entry.
- `/admin/research/[id]/preview` — authenticated editorial preview.
- `/admin/work/new` — create an experiment, publication, open-source entry, or project draft.

## Publishing behavior

- New research and work entries start as drafts.
- Research can be published, unpublished back to draft, or archived.
- Archived records remain in the database and are excluded from public queries.
- Public content queries continue to return published records only.
- D1 mutations require the Cloudflare `DB` binding. If it is missing, the editor returns a configuration error instead of reporting a false save.

## Editor format

Research bodies use the Phase 3 text format:

- `## Heading` for sections.
- Blank lines for paragraphs.
- `- Item` for lists.

This keeps the first editor portable and avoids unsanitized HTML. Rich blocks can be introduced later if needed.

