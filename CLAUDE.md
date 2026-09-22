# CLAUDE.md

Birthday "Save the Date" + RSVP site. One SvelteKit app, no separate backend.

## Stack

SvelteKit 2 / Svelte 5 (runes only) · adapter-node · Tailwind 4 (CSS-first theme in `src/app.css`, colours `prime-*`/`second-*`) · Drizzle ORM + Postgres · Better Auth (magic link + GitHub/Google/Discord) · Paraglide i18n (`en`, `de`) · bits-ui · unplugin-icons (`~icons/heroicons/*`) · zod 4 · Vitest 5 · Playwright · pnpm, Node 24.

## Commands

```sh
docker compose -f docker-compose.dev.yml up -d   # Postgres :5432 + MailDev UI :1080
pnpm dev                                         # http://localhost:5173
pnpm check && pnpm lint                          # svelte-check, prettier, eslint
pnpm test:unit -- --run                          # unit + PGlite-backed service/API tests
pnpm test:e2e                                    # builds, then Playwright (normal + hero-only server)
pnpm db:generate | db:migrate | db:seed          # drizzle migrations / example shifts
```

`DATABASE_URL=pglite://./.pglite` runs everything without Docker. `EMAIL_TRANSPORT=json|file` avoids SMTP.

## Layout

- `src/routes/` pages with `+page.server.ts` loads and **form actions** (`use:enhance`); mutations return `{ feedback: { code, message } }` shown via `$lib/stores/alert.svelte.ts`.
- `src/routes/api/` REST mirror of the same services (`docs/api.md`), envelope `{ ok, code, message?, data }`.
- `src/lib/server/services/{guest,shift}.ts` business logic; throw `ApiError(code, status, message)`.
- `src/lib/server/db/schema.ts` (snake_case columns, camelCase TS), migrations committed in `drizzle/`.
- `src/lib/server/auth/index.ts` Better Auth; guest fields are `additionalFields` with `input: false`.
- `src/hooks.server.ts` order: paraglide → hero-only guard → auth/session → headers.
- `messages/{en,de}.json` flat `snake_case` keys, used as `m.key()`; server side via `t()` in `$lib/server/i18n.ts`.
- `src/lib/assets/img/` feature images via `<enhanced:img>`; `static/` everything else.

## Conventions

- Runes only (`$state`, `$derived`, `$props`), snippets instead of slots, no `on:` directives.
- Keep both locales in sync when adding messages; escape `{}` in message text.
- Validate all input with zod schemas in `src/lib/schemas/`; never trust FormData directly.
- Every DB change: edit schema → `pnpm db:generate` → commit the SQL.
- Security headers, hero-only mode (`PUBLIC_HERO_ONLY`) and locale live in hooks; do not bypass with per-route hacks.
- Run `pnpm format` before committing; CI runs lint, check, unit, e2e and a Docker build.
- Commit messages: imperative subject with scope (`feat(guests): …`), body explains why.

## Deployment

Single Docker image (`Dockerfile`, migrations on start), `docker-compose.yml` (+ `--profile db`). Secrets are injected from the shell (Infisical), see `docs/deployment.md` and `docs/infisical.md`. Required in prod: `ORIGIN`, `BETTER_AUTH_SECRET`, `DATABASE_URL`, SMTP settings.
