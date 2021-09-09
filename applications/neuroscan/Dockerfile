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
RUN wget -q https://downloads.rclone.org/rclone-current-linux-amd64.zip
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
