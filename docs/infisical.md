# Secrets with Infisical

The application only reads `process.env`; nothing Infisical-specific is baked into the image.
Two ways to inject secrets:

## Option A - Infisical CLI on the host (recommended)

Install the [Infisical CLI](https://infisical.com/docs/cli/overview) on the deploy host and
let it populate the shell environment for `docker compose`:

```sh
# one-time: link the folder to your Infisical project (writes .infisical.json)
infisical init

# machine identity for non-interactive hosts
export INFISICAL_TOKEN=$(infisical login --method=universal-auth \
  --client-id="$INFISICAL_CLIENT_ID" --client-secret="$INFISICAL_CLIENT_SECRET" --plain)

# self-hosted Infisical? point the CLI at it
# export INFISICAL_API_URL=https://infisical.example.com/api

infisical run --env=prod --path=/bdayhero -- docker compose up -d
```

`docker-compose.yml` passes every variable through with `environment: KEY: ${KEY}`, so the
values from Infisical reach the container unchanged (no `$` interpolation issues).

Example `.infisical.json`:

```json
{
	"workspaceId": "<project id>",
	"defaultEnvironment": "prod",
	"gitBranchToEnvironmentMapping": null
}
```

## Option B - Infisical Agent / rendered .env

Run the [Infisical Agent](https://infisical.com/docs/integrations/platforms/infisical-agent)
as a sidecar or systemd service that renders a `.env` file:

```yaml
# agent-config.yaml
infisical:
  address: https://app.infisical.com
auth:
  type: universal-auth
  config:
    client-id: /etc/infisical/client-id
    client-secret: /etc/infisical/client-secret
templates:
  - source-path: /etc/infisical/env.tpl
    destination-path: /opt/bdayhero/.env
    config:
      polling-interval: 60s
      execute:
        command: docker compose -f /opt/bdayhero/docker-compose.yml up -d --force-recreate app
```

`env.tpl`:

```
{{- with secret "<project id>" "prod" "/bdayhero" }}
{{- range . }}
{{ .Key }}={{ .Value }}
{{- end }}
{{- end }}
```

Then replace the `environment:` block in `docker-compose.yml` with

```yaml
env_file:
  - path: .env
    format: raw
```

`format: raw` (Compose ≥ 2.30) stops Compose from interpolating `$` inside the values.

## Secrets to store

`BETTER_AUTH_SECRET`, `DATABASE_URL` (or `POSTGRES_PASSWORD`), `EMAIL_HOST_PASSWORD`,
`GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_SECRET`, `DISCORD_CLIENT_SECRET`. Non-secret settings
(`ORIGIN`, `PUBLIC_HERO_ONLY`, `EMAIL_HOST`, client ids, ...) can live in Infisical as well or
in the compose environment.
