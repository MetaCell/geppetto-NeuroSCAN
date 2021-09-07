####################################################################
# FRONTEND BUILD

FROM node:14.16.1-alpine3.10 AS fronend-build

ARG REACT_APP_BACKEND_URL=http://localhost:1337

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
# configure rclone
RUN mkdir -p /root/.config/rclone
COPY ./backend/rclone/rclone.conf /root/.config/rclone/rclone.conf

#
WORKDIR /my-path

COPY ./backend/package.json ./
COPY ./backend/yarn.lock ./

RUN yarn install

COPY ./backend .

RUN chmod a+x rclone/rclone-sync.sh

# move the public folder to the persistent storage
RUN mkdir -p /opt/storage/public
RUN mv public /opt/
RUN ln -s /opt/storage/public .

ENV NODE_ENV production

RUN yarn build

COPY --from=fronend-build /app/frontend/build /opt/storage/public

EXPOSE 1337

CMD ["yarn", "start"]
