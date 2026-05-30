# syntax=docker/dockerfile:1
#
# Server (NestJS + Prisma) – Build-Context ist das Repo-Root (Monorepo).
# Build:  docker build -f apps/server/Dockerfile -t kidilias/bdayhero-server .

ARG NODE_VERSION=22

############################
# Base
############################
FROM node:${NODE_VERSION}-bookworm-slim AS base
ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH
WORKDIR /app
# openssl wird von Prisma zur Laufzeit benoetigt
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl \
 && rm -rf /var/lib/apt/lists/*
RUN corepack enable

############################
# Build (inkl. nativer Module wie bcrypt)
############################
FROM base AS build
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ \
 && rm -rf /var/lib/apt/lists/*

# Gesamtes Monorepo kopieren (Client-postinstall `nuxt prepare` braucht die Sourcen)
COPY . .

# Abhaengigkeiten installieren (inkl. erlaubter Build-Scripts via onlyBuiltDependencies)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# Prisma Client generieren + Workspace-Pakete bauen
RUN pnpm exec prisma generate \
 && pnpm --filter @bdayhero/shared build \
 && pnpm --filter @bdayhero/server build

############################
# Runtime
############################
FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app /app

# Secrets nicht im Image ausliefern – Werte kommen zur Laufzeit ueber env_file
RUN rm -f /app/.env

# Informativ – tatsaechlicher Port wird ueber PORT_BACKEND gesteuert
EXPOSE 3001

# Migrationen anwenden, dann Server starten
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && pnpm --filter @bdayhero/server start"]
