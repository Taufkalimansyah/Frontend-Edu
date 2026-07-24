# ===========================================================
# Stage 1 - Build React App
# ===========================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency file
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build production
RUN npm run build


# ===========================================================
# Stage 2 - Nginx
# ===========================================================
FROM nginx:1.29-alpine

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy build result
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]