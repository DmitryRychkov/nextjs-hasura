FROM node:lts-alpine as dev

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install --production=false

COPY ./tsconfig.json ./next.config.js ./next-env.d.ts ./
