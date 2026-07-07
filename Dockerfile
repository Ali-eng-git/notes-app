# ---------- Stage 1 : Build React ----------
FROM node:22-alpine AS frontend-builder

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ .

RUN npm run build

# ---------- Stage 2 : Backend ----------
FROM node:22-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm ci --omit=dev

COPY backend/ .

COPY --from=frontend-builder /frontend/dist ./public

EXPOSE 9000

CMD ["npm", "start"]