# build
FROM node:18-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
RUN pwd
COPY . ./
RUN npm run build

# serve
FROM nginx:1.20
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY conf/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]