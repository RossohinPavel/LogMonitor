ARG PNPM_CACHE_DIR=/pnpm-store

# --- Stage 1: Builder ---
FROM node:24.14.0-alpine AS builder

ARG PNPM_CACHE_DIR

RUN corepack enable
WORKDIR /app

COPY package.json pnpm*.yaml ./
COPY backend/package.json backend/pnpm*.yaml ./backend/
COPY backend/nest-cli.json backend/tsconfig*.json ./backend/

RUN --mount=type=cache,id=pnpm,target=${PNPM_CACHE_DIR} \
    pnpm install --frozen-lockfile --ignore-scripts=false --store-dir ${PNPM_CACHE_DIR}

COPY backend/src/ ./backend/src/
RUN pnpm --filter backend run prepare
RUN pnpm --filter backend run build

# --- Stage 2: Production ---
FROM node:24.14.0-alpine AS production

ARG PNPM_CACHE_DIR

RUN corepack enable
WORKDIR /app

COPY package.json pnpm*.yaml ./
COPY backend/package.json backend/pnpm*.yaml ./backend/

RUN --mount=type=cache,id=pnpm,target=${PNPM_CACHE_DIR} \
    pnpm install --prod --frozen-lockfile --ignore-scripts --store-dir ${PNPM_CACHE_DIR}

COPY --from=builder /app/backend/dist ./backend/dist

EXPOSE 3000

CMD ["pnpm", "--filter", "backend", "start:prod"]