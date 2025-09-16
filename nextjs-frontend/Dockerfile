FROM node:20-bookworm

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of your application code
COPY . .

# Make start.sh executable
RUN chmod +x /app/start.sh

# Create .next directory with proper permissions
RUN mkdir -p /app/.next && chmod -R 777 /app/.next

# Ensure all files have proper permissions
RUN chmod -R 777 /app

EXPOSE 3000

# Start the application (running as root to avoid permission issues)
CMD ["./start.sh"]