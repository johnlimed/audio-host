FROM node:20 AS base
WORKDIR /

FROM base AS frontend
COPY frontend/src frontend/src
COPY frontend/public frontend/public
COPY frontend/package.json frontend/package.json
COPY frontend/package-lock.json frontend/package-lock.json
COPY frontend/config-overrides.js frontend/config-overrides.js
COPY frontend/tsconfig.json frontend/tsconfig.json
WORKDIR /frontend
RUN npm install
RUN npm run build
EXPOSE 3000

FROM base AS backend
WORKDIR /backend
COPY backend/package.json ./
COPY backend/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
  npm install
COPY backend/src ./
EXPOSE 3001
