FROM node:20 AS base
WORKDIR /usr/local/app

FROM base AS frontend
COPY frontend/build ./frontend

FROM frontend-build AS frontend-serve
EXPOSE 3000
CMD ["npx", "serve", "-s", "./frontend"]

FROM base AS backend
COPY backend/package.json backend/package-lock.json ./
RUN --mount=type=bind,source=backend/package.json,target=backend/package.json \
  --mount=type=bind,source=backend/package-lock.json,target=backend/package-lock.json \
  --mount=type=cache,target=/root/.npm \
  npm install
COPY ./backend ./

FROM backend AS backend-serve
EXPOSE 3001
CMD ["npx", "tsx", "index.ts"]