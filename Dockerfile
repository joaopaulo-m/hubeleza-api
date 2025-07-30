# Etapa de dependências e build
FROM node:18.18-alpine AS builder

RUN apk add --no-cache openssl libssl3 python3 make g++ && \
    corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate
RUN pnpm run build

# Etapa final de produção
FROM node:18.18-alpine AS production

RUN apk add --no-cache dumb-init && \
    addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001 && \
    corepack enable && corepack prepare pnpm@8.6.12 --activate

WORKDIR /app

# Copiar somente os artefatos necessários
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/src/generated ./dist/generated
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 4000
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "./dist/main/server.js"]