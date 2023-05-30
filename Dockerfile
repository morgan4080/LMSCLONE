# build stage
FROM node:lts-alpine as build-stage
WORKDIR /lms
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./.nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /lms/dist /usr/share/nginx/html/admin
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

