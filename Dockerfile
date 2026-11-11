# Base image with Node.js 20 on Ubuntu LTS
FROM node:20-slim

WORKDIR /app

# Install system dependencies needed for Chromium & Playwright
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    libnss3 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libdrm2 \
    libgbm1 \
    libasound2 \
    libxshmfence1 \
    libglib2.0-0 \
    libgtk-3-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy package configuration
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy all application code
COPY . .

# Build the frontend application
RUN npm run build

# Render automatically provides PORT environment variable (default 10000 or 3000)
ENV PORT=3000
EXPOSE 3000

# Start production server binding to 0.0.0.0 and dynamically assigned PORT
CMD ["sh", "-c", "npx vite preview --host 0.0.0.0 --port ${PORT:-3000}"]
