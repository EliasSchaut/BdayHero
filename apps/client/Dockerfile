# syntax=docker/dockerfile:1
#
# Client (Nuxt 4) – Build-Context ist das Repo-Root (Monorepo).
# Build:  docker build -f apps/client/Dockerfile -t kidilias/bdayhero-client .
#
# Env-Handling: Der Build backt KEINE runtimeConfig-Werte ein. Einzige Ausnahme ist der
# Apollo-GraphQL-Endpoint (BACKEND_URL), den @nuxtjs/apollo zur Build-Zeit serialisiert –
# er kommt daher als Build-Arg herein. Alle uebrigen Werte werden zur LAUFZEIT gesetzt:
# Die .env nutzt bereits die NUXT_*-Konvention; node laedt sie via --env-file-if-exists,
# und Nuxt uebernimmt die NUXT_*-Vars automatisch in die runtimeConfig (kein Rebuild noetig).

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

# BACKEND_URL (Apollo-Endpoint) wird zur Build-Zeit eingebacken – Default passt fuer
# lokales Compose; fuer andere Deployments via --build-arg / compose build.args setzen.
ARG BACKEND_URL=http://localhost:3001
ENV BACKEND_URL=$BACKEND_URL

# shared zuerst bauen (vom Client importiert), dann Nuxt bauen (ohne .env-Bake)
RUN pnpm --filter @bdayhero/shared build \
 && pnpm --filter @bdayhero/client build

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

# node laedt die gemountete .env (Keys bereits NUXT_*-benannt) und startet dann Nitro
CMD ["node", "--env-file-if-exists=/app/.env", ".output/server/index.mjs"]
