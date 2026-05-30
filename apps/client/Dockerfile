# syntax=docker/dockerfile:1
#
# Client (Nuxt 4) – Build-Context ist das Repo-Root (Monorepo).
# Build:  docker build -f apps/client/Dockerfile -t kidilias/bdayhero-client .
#
# Hinweis: Nuxt backt runtimeConfig und den Apollo-Endpoint (BACKEND_URL) beim Build
# aus der .env ein. Daher wird die .env hier per `--dotenv` eingelesen (dotenv-sicher
# fuer $-Zeichen in Secrets). Einzelne Werte lassen sich zur Laufzeit per NUXT_*-Env
# ueberschreiben (z.B. NUXT_PUBLIC_FRONTEND_URL, NUXT_JWT_SECRET).

ARG NODE_VERSION=22

############################
# Base
############################
FROM node:${NODE_VERSION}-bookworm-slim AS base
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH
WORKDIR /app
RUN corepack enable

############################
# Build
############################
FROM base AS build
# Toolchain fuer native Module (sharp/@nuxt/image, bcrypt im Workspace)
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ openssl \
 && rm -rf /var/lib/apt/lists/*

COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# shared zuerst bauen (vom Client importiert), dann Nuxt bauen
RUN pnpm --filter @bdayhero/shared build \
 && pnpm --filter @bdayhero/client exec nuxt build --dotenv /app/.env

############################
# Runtime – .output ist self-contained, keine node_modules noetig
############################
FROM base AS runtime
ENV NODE_ENV=production \
    NITRO_HOST=0.0.0.0 \
    NITRO_PORT=3000
WORKDIR /app
COPY --from=build /app/apps/client/.output ./.output

# Informativ – tatsaechlicher Port wird ueber NITRO_PORT gesteuert
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
