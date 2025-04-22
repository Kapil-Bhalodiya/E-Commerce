# Build stage
FROM node:18-slim AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy application code and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production

RUN mkdir -p /var/cache/nginx/client_temp /tmp \
    && chown -R nginx:nginx /var/cache/nginx /usr/share/nginx/html /tmp

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from build stage
COPY --from=build /app/dist/e-commerce/browser /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Run with non-root
# USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]