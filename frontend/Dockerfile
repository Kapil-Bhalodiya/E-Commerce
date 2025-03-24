# Step 1: Build the Angular app using Node.js image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application source code
COPY . /app

# Build the Angular app for production
RUN npm run build --prod

# Step 2: Use Nginx to serve the Angular app
FROM nginx:alpine

# Remove default nginx index.html
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Angular app from the build stage to Nginx's default HTML folder
COPY --from=build /app/dist/e-commerce/browser /usr/share/nginx/html

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx in the foreground (this keeps the container running)
CMD ["nginx", "-g", "daemon off;"]
