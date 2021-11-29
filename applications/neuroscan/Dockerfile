####################################################################
# FRONTEND BUILD

FROM node:14.16.1-alpine3.10 AS fronend-build

ARG REACT_APP_BACKEND_URL=''

# YARN REQUIRES GIT BINARY
RUN apk add git
RUN yarn global add typescript

# INSTALL PACKAGES
RUN mkdir -p /app
WORKDIR /app/frontend

COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./

### START GEPPETTO META DEVELOP
#
# for now we will use geppetto-meta development branch (clone it local)
# when geppetto meta v > 0.05 is released comment the lines below
# COPY ./frontend/development_package ./development_package
# COPY ./frontend/geppetto-setup.sh ./geppetto-setup.sh
# RUN chmod +x geppetto-setup.sh
# RUN sh -c ./geppetto-setup.sh
#
### END GEPPETTO META DEVELOP

RUN yarn

# COPY SOURCE CODE
COPY ./frontend .

# BUILD
RUN yarn build
####################################################################

# MAIN BUILD

# https://github.com/strapi/strapi-docker/blob/master/examples/custom/Dockerfile
FROM strapi/base as base

# Configured by helm chart
ENV DATABASE_FILENAME .tmp/data.db

# install rclone
WORKDIR /tmp
COPY ./backend/rclone/rclone-current-linux-amd64.zip /tmp
RUN unzip rclone-current-linux-amd64.zip
RUN rm rclone-current-linux-amd64.zip
RUN cp rclone*/rclone /usr/bin/rclone
RUN rm -rf rclone*

#
WORKDIR /my-path

COPY ./backend/package.json ./
COPY ./backend/yarn.lock ./

RUN yarn install

COPY ./backend .

ENV NODE_ENV production

RUN yarn build

COPY --from=fronend-build /app/frontend/build ./public
COPY ./scripts ./scripts
# configure rclone
RUN mkdir -p /root/.config/rclone
COPY ./backend/rclone/rclone.conf /root/.config/rclone/rclone.conf

RUN chmod +x scripts/*.sh
RUN chmod +x rclone/rclone-sync.sh

EXPOSE 1337

CMD scripts/start-strapi.sh
