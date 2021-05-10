# node-sass 4.14.1 requires node version <= 14 for Alpine Linux
# See: https://github.com/sass/node-sass/releases/tag/v4.14.1
FROM node:14.16.1-alpine3.10 AS build-stage

ARG REACT_APP_BACKEND_URL=http://localhost:1337

WORKDIR /app

# YARN REQUIRES GIT BINARY
RUN apk add git

# INSTALL PACKAGES
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn

# COPY SOURCE CODE
COPY . .

# BUILD
RUN yarn build

####################################################################

FROM nginx:alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# NGINX PORT
EXPOSE 80
