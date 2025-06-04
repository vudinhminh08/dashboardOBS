# FROM node:18-alpine AS build

# WORKDIR /app

# COPY . .

# RUN npm install

# RUN npm run build

# FROM nginx:1.21.6

# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


FROM node:lts as builder


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/base-angular /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
