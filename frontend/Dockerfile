# node-sass 4.14.1 requires node version <= 14 for Alpine Linux
# See: https://github.com/sass/node-sass/releases/tag/v4.14.1
FROM node:14.16.1-alpine3.10 AS build-stage

ARG REACT_APP_BACKEND_URL=http://localhost:1337

WORKDIR /app

# YARN REQUIRES GIT BINARY
RUN apk add git
RUN yarn global add typescript
#RUN yarn global add yalc

# INSTALL geppetto-ui as dependency
#RUN git clone -b development https://github.com/MetaCell/geppetto-meta.git

#WORKDIR /app/geppetto-meta/geppetto.js/geppetto-ui
#RUN git pull
#RUN yarn && yarn build && yarn publish:yalc
#
#WORKDIR /app/geppetto-meta/geppetto.js/geppetto-core
#RUN yarn && yarn build && yarn publish:yalc
#
#WORKDIR /app/geppetto-meta/geppetto.js/geppetto-client
#RUN yarn && yarn build && yarn publish:yalc

# INSTALL PACKAGES
WORKDIR /app/frontend
COPY ./package.json ./
COPY ./yarn.lock ./

#RUN yalc link @metacell/geppetto-ui
#RUN yalc link @metacell/geppetto-meta-client
#RUN yalc link @metacell/geppetto-meta-core
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
