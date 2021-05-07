# https://github.com/strapi/strapi-docker/blob/master/examples/custom/Dockerfile
FROM strapi/base

WORKDIR /my-path

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
