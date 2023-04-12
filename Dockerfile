# build
FROM 194836855709.dkr.ecr.us-east-1.amazonaws.com/node18:latest as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install
RUN npm install -g @vue/cli
COPY . ./
RUN npm run build

# serve
FROM nginx:1.20
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY conf/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
