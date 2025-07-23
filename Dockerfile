# Stage 1: Build the Astro project
FROM node:22-alpine AS build
RUN npm install -g pnpm@latest
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.static.conf /etc/nginx/conf.d/nginx.conf
COPY fullchain.pem privkey.pem /etc/nginx/ssl/
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
