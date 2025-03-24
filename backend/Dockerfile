# Step 1: Build stage - Using the official Node.js image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install all dependencies (including native modules like bcrypt)
RUN npm install

# Rebuild bcrypt to ensure it's compiled correctly for the container architecture
RUN npm rebuild bcrypt

# Step 2: Production stage - Using a smaller image
FROM node:18 AS production

# Set the working directory in the container
WORKDIR /app

# Copy everything from the local project directory into the container
COPY . /app

#bcrypt compiled on OSX will not quite work on Linux
RUN rm -rf node_modules
RUN npm install bcrypt

# Expose the port your app will be listening on
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]
