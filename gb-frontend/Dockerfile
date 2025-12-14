# ========= BUILD STAGE =========
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos package files
COPY package.json package-lock.json ./
RUN npm ci

# Copiamos el resto del código
COPY . .

# Build de producción
RUN npm run build


# ========= RUN STAGE =========
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# Limpiamos config default
RUN rm -rf ./*

# Copiamos el build generado
COPY --from=build /app/dist .

# Copiamos config custom de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
