# build
FROM node:lts-slim as builder
WORKDIR /app
ARG STAGE

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
#RUN npm rebuild node-sass
COPY . .
RUN echo $STAGE
RUN ./env.sh
RUN npm run build

#  server
FROM nginx:stable-alpine as server

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
