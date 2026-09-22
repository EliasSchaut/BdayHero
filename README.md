# BdayHero

"Save the Date" and sign-up page for my birthday.

**Stack:** SvelteKit 2 / Svelte 5 (adapter-node) · Tailwind 4 · Drizzle ORM on Postgres ·
Better Auth (magic link, GitHub/Google/Discord) · Paraglide i18n (en/de) · Vitest + Playwright.

> Not intended to be hosted by anyone else, but feel free to borrow ideas.

## Development

```sh
pnpm install
cp .env.example .env            # DATABASE_URL="pglite://./.pglite" works without Postgres
pnpm db:migrate                 # apply drizzle/ migrations
pnpm db:seed                    # example shifts
pnpm dev
```

Magic-link mails are printed to the terminal with `EMAIL_TRANSPORT=json`.

## Scripts

| Script             | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| `pnpm dev`         | Vite dev server                                           |
| `pnpm build`       | Production build into `build/` (run with `node build`)    |
| `pnpm check`       | svelte-check (types)                                      |
| `pnpm lint`        | Prettier + ESLint                                         |
| `pnpm test:unit`   | Vitest: unit tests + service/API tests on embedded PGlite |
| `pnpm test:e2e`    | Build + Playwright (normal and hero-only server)          |
| `pnpm db:generate` | Generate a migration from `src/lib/server/db/schema.ts`   |
| `pnpm db:migrate`  | Apply migrations (`DATABASE_URL`)                         |
| `pnpm db:seed`     | Seed example shifts                                       |

## Features

- Landing page with feature deck, testimonials, blog links and community call-to-action
- RSVP with attendance, companions, sleeping-place and diet options, public guest list
- Volunteer shifts with capacity limits
- `PUBLIC_HERO_ONLY=true` deploys the landing page only (registration not open yet)
- REST API under `/api` ([docs/api.md](docs/api.md))

## Deployment

Single Docker image, migrations on start, Postgres 17 via `docker compose --profile db`.
See [docs/deployment.md](docs/deployment.md) and [docs/infisical.md](docs/infisical.md) for
environment variables and secret injection.
