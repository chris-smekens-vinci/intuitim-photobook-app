# frontend/app/Dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/app/browser .
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

EXPOSE 5172

CMD ["nginx", "-g", "daemon off;"]