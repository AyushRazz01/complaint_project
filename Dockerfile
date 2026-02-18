# Use Node image
FROM node:18

# Set working folder
WORKDIR /app

# Copy backend files
COPY backend/ .

# Install dependencies
RUN npm install

# Start server
CMD ["node","server.js"]

# Expose port
EXPOSE 3000
