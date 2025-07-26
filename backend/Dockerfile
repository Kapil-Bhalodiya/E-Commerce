FROM node:18-alpine

<<<<<<< HEAD
# Needed for bcrypt to compile
RUN apk add --no-cache python3 make g++ 

# Set NODE_ENV
=======
RUN apk add --no-cache python3 make g++

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
ENV NODE_ENV=production

WORKDIR /app

<<<<<<< HEAD
# Copy package files and install dependencies
COPY package*.json ./

RUN npm ci --only=production

RUN npm rebuild bcrypt

# Copy application code
COPY . .

RUN mkdir -p /app/logs && chown node:node /app/logs

# Non-root user for security
USER node

# Expose application port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD wget --quiet --tries=1 --spider http://localhost:8000/health || exit 1

# Run the application - adjust based on your actual entry point
CMD ["node", "src/index.js"]
=======
COPY package*.json ./

RUN npm ci --only=production
RUN npm rebuild bcrypt

COPY . .
# Ensure logs and public dirs exist with correct permissions
RUN mkdir -p /app/logs /app/public && chown -R node:node /app/logs /app/public

USER node

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD wget --quiet --tries=1 --spider http://localhost:8000/health || exit 1

CMD ["node", "src/index.js"]
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
