FROM node:20-bookworm

# Install pnpm globally
RUN npm install -g pnpm

# Create app directory and set permissions
RUN mkdir -p /app && chown -R node:node /app

# Set the working directory
WORKDIR /app

# Switch to node user for all subsequent operations
USER node

# Copy package files and install dependencies
COPY --chown=node:node package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of your application code
COPY --chown=node:node . .

# Make start.sh executable
USER root
RUN chmod +x /app/start.sh
USER node

EXPOSE 3000

# Start the application
CMD ["./start.sh"]