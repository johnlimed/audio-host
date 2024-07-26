FROM node:20 AS base
WORKDIR /

FROM base AS frontend
COPY frontend/src frontend/src
COPY frontend/public frontend/public
COPY frontend/package.json frontend/package.json
COPY frontend/package-lock.json frontend/package-lock.json
WORKDIR /frontend
RUN npm install

FROM frontend AS frontend-build
RUN npm run build

FROM frontend-build AS frontend-serve
EXPOSE 3000

FROM base AS backend
WORKDIR /backend
COPY backend/package.json ./
COPY backend/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
  npm install
COPY backend/src ./

FROM backend AS backend-serve
EXPOSE 3001
USER user
