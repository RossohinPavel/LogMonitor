ARG PNPM_CACHE_DIR=/pnpm-store

# --- Stage 1: Builder ---
FROM node:24.14.0-alpine AS builder

ARG PNPM_CACHE_DIR

RUN corepack enable
WORKDIR /app

COPY package.json pnpm*.yaml ./
COPY frontend/package.json frontend/pnpm*.yaml ./frontend/
COPY frontend/vite.config.ts frontend/tsconfig*.json ./frontend/

RUN --mount=type=cache,id=pnpm,target=${PNPM_CACHE_DIR} \
    pnpm install --frozen-lockfile --ignore-scripts=false --store-dir ${PNPM_CACHE_DIR}

COPY frontend/index.html ./frontend/
COPY frontend/public/ ./frontend/public/
COPY frontend/src/ ./frontend/src/

# Объявляем ARG с тем же именем, что и в compose-файле
ARG VITE_BACKEND_URL

RUN pnpm --filter frontend run build

# --- Stage 2: Production --
FROM nginx:alpine

COPY --from=builder /app/frontend/dist /usr/share/nginx/html/
COPY ./frontend/nginx.conf /etc/nginx/

CMD ["nginx", "-g", "daemon off;"]
