# Use Node.js 20 Alpine as base image for lightweight container
FROM node:20-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) for dependency installation
# Doing this first allows Docker to cache this layer if source code changes
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Health check (optional but recommended)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Command to run the application
CMD ["node", "index.js"]
