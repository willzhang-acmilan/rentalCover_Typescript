# Use the official Node.js LTS image
FROM mcr.microsoft.com/playwright:v1.54.2-jammy

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Install Allure commandline globally
RUN npm install -g allure-commandline

# Copy the rest of your project files
COPY . .

# Expose the report folder (optional)
VOLUME ["/app/allure-report", "/app/playwright-report", "/app/test-results"]

# Default command (can be overridden in Jenkins)
CMD ["npx", "playwright", "test"]