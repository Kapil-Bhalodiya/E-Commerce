FROM node:18-alpine

RUN apk add --no-cache python3 make g++

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production
RUN npm rebuild bcrypt

# Copy all source code including public/
COPY . .

# Ensure logs and public dirs exist with correct permissions
RUN mkdir -p /app/logs /app/public && chown -R node:node /app/logs /app/public

USER node

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD wget --quiet --tries=1 --spider http://localhost:8000/health || exit 1

CMD ["node", "src/index.js"]
