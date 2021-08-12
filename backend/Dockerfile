# https://github.com/strapi/strapi-docker/blob/master/examples/custom/Dockerfile
FROM strapi/base

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
COPY rclone/rclone.conf /root/.config/rclone/rclone.conf

#
WORKDIR /my-path

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

RUN chmod a+x rclone/rclone-sync.sh

# move the public folder to the persistent storage
RUN mkdir -p /opt/storage/public
RUN mv public /opt/
RUN ln -s /opt/storage/public .

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
