# node-sass 4.14.1 requires node version <= 14 for Alpine Linux
# See: https://github.com/sass/node-sass/releases/tag/v4.14.1
FROM node:14.16.1-alpine3.10 AS build-stage

ARG REACT_APP_BACKEND_URL=http://localhost:1337

WORKDIR /app

# YARN REQUIRES GIT BINARY
RUN apk add git
RUN yarn global add yalc
RUN yarn global add typescript

# INSTALL geppetto-ui as dependency
RUN git clone https://github.com/MetaCell/geppetto-meta.git
WORKDIR /app/geppetto-meta/geppetto.js/geppetto-ui
RUN git checkout feature/66_geppetto_ui_package
RUN yarn && yarn build
RUN yalc publish

# INSTALL PACKAGES
WORKDIR /app/frontend
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yalc add @geppettoengine/geppetto-ui
RUN yarn

# COPY SOURCE CODE
COPY . .

# BUILD
RUN yarn build

####################################################################

FROM nginx:alpine
COPY --from=build-stage /app/frontend/build/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# NGINX PORT
EXPOSE 80
