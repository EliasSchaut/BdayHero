# Deployment

BdayHero is one Node process (SvelteKit + adapter-node) in front of a Postgres database.

## Environment variables

| Variable                                                                                 | Required | Description                                                                  |
| ---------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------- |
| `ORIGIN`                                                                                 | yes      | Public URL (`https://bday.example.com`). Needed for the CSRF check on forms. |
| `BETTER_AUTH_URL`                                                                        | no       | Auth base URL, defaults to `ORIGIN`.                                         |
| `BETTER_AUTH_SECRET`                                                                     | yes      | ≥ 32 random characters (`openssl rand -base64 32`).                          |
| `DATABASE_URL`                                                                           | yes      | `postgres://user:pass@host:5432/db` or `pglite://./dir` for local use.       |
| `MIGRATE_ON_START`                                                                       | no       | `false` skips `drizzle/` migrations at container start (default `true`).     |
| `PROJ_TITLE`                                                                             | no       | Sender name / subject prefix for mails (default `KidsBday`).                 |
| `PUBLIC_HERO_ONLY`                                                                       | no       | `true` shows only the landing page, imprint and privacy.                     |
| `PUBLIC_MAX_COMPANIONS_PER_GUEST`                                                        | no       | Companion limit per guest (default `1`).                                     |
| `EMAIL_TRANSPORT`                                                                        | no       | `smtp` (default), `json` (log), `file` (write to `EMAIL_FILE_DIR`).          |
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_SECURE` / `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD` | smtp     | SMTP settings for magic-link mails.                                          |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`, `GOOGLE_*`, `DISCORD_*`                     | no       | OAuth providers; enabled when the client id is set.                          |
| `PORT`, `HOST`, `BODY_SIZE_LIMIT`                                                        | no       | adapter-node runtime options.                                                |

OAuth redirect URIs to register at the providers: `${BETTER_AUTH_URL}/api/auth/callback/github`,
`/google`, `/discord`.

## Docker

Released images are published to Docker Hub as `kidilias/bdayhero` (tag workflow, needs the
repository secrets `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`). Build locally with:

```sh
docker build -t kidilias/bdayhero .
docker run --rm -p 3000:3000 \
  -e ORIGIN=http://localhost:3000 -e BETTER_AUTH_SECRET=... -e DATABASE_URL=postgres://... \
  kidilias/bdayhero
```

The image is non-root, exposes `:3000`, has a health check on `/api/health` and applies
migrations before starting. `docker compose --profile db up -d` also starts Postgres 17
(volume `pgdata`).

### Passing secrets to compose

`docker-compose.yml` uses `environment:` pass-throughs (`KEY: ${KEY}`), so values come from
the shell that runs `docker compose` and are not interpolated again - a `$` inside a secret is
safe. Recommended: `infisical run -- docker compose up -d` (see [infisical.md](./infisical.md)).
If you must use a file, use `env_file: [{ path: .env, format: raw }]` (Compose ≥ 2.30) which
disables interpolation.

Note that Compose also reads a `.env` file **in the project directory** to substitute the
`${VAR}` placeholders. Keep your local development `.env` out of the deploy host, or run
compose with `--env-file /dev/null` when secrets come from Infisical.

The app retries the initial migration for about a minute while Postgres starts, so no
`depends_on` ordering is required.

## First start

1. Set the variables above.
2. Start the container; migrations run automatically.
3. Seed shifts (optional): `docker compose exec app node scripts/seed-shifts.mjs` - or insert
   rows into `shift`, `shift_info` (one per language) and `shift_slot` yourself.
4. Deploy with `PUBLIC_HERO_ONLY=true` until registration opens, then flip it and restart.

## Local development

```sh
pnpm install
cp .env.example .env
docker compose -f docker-compose.dev.yml up -d   # Postgres + MailDev
pnpm db:migrate && pnpm db:seed
pnpm dev
```

Magic-link mails land in MailDev at <http://localhost:1080>. Without Docker use
`DATABASE_URL="pglite://./.pglite"` and `EMAIL_TRANSPORT=json` (mails are printed to the terminal).
