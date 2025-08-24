FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN cd backend && npm ci --only=production
RUN cd frontend && npm ci

# Copy source code
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Build frontend
RUN cd frontend && npm run build

# Copy built frontend to backend public folder
RUN cp -r frontend/dist backend/public

# Expose port
EXPOSE 3000

# Set working directory to backend
WORKDIR /app/backend

# Start the server
CMD ["npm", "start"]
