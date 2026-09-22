# BdayHero

"Save the Date" and sign-up page for my birthday. Built with SvelteKit (Svelte 5), Drizzle ORM on Postgres, Better Auth and Paraglide.

> Not intended to be hosted by anyone else, but feel free to borrow ideas.

## Development

```sh
pnpm install
cp .env.example .env            # fill in DATABASE_URL, BETTER_AUTH_SECRET, ...
docker compose --profile db up -d db
pnpm db:migrate                 # apply drizzle/ migrations
pnpm db:seed                    # example shifts
pnpm dev
```

## Scripts

| Script             | Purpose                                                     |
| ------------------ | ----------------------------------------------------------- |
| `pnpm dev`         | Vite dev server                                             |
| `pnpm build`       | Production build (`build/`, run with `node build`)          |
| `pnpm check`       | svelte-check                                                |
| `pnpm lint`        | Prettier + ESLint                                           |
| `pnpm test:unit`   | Vitest (unit + server tests on PGlite)                      |
| `pnpm test:e2e`    | Playwright                                                  |
| `pnpm db:generate` | Generate a new migration from `src/lib/server/db/schema.ts` |
| `pnpm db:migrate`  | Apply migrations                                            |
| `pnpm db:seed`     | Seed example shifts                                         |

See `docs/deployment.md` for deployment, environment variables and Infisical.
