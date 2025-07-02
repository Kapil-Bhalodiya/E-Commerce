FROM node:18-alpine

# Needed for bcrypt to compile
RUN apk add --no-cache python3 make g++ 

# Set NODE_ENV
ENV NODE_ENV=production

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm ci --only=production

RUN npm rebuild bcrypt

# Copy application code
COPY . .

# Create logs directory and set permissions
RUN mkdir -p /app/logs && chown -R node:node /app/logs /app/public

# Non-root user for security
USER node

# Expose application port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD wget --quiet --tries=1 --spider http://localhost:8000/health || exit 1

# Run the application - adjust based on your actual entry point
CMD ["node", "src/index.js"]