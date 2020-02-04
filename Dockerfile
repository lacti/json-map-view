FROM node:10-alpine as builder

WORKDIR /tmp
COPY package.json yarn.lock /tmp/
RUN yarn

COPY . /tmp/
ARG PREFIX=/
RUN PUBLIC_URL=${PREFIX} yarn build

FROM nginx

ARG PREFIX=/
COPY --from=builder /tmp/build /usr/share/nginx/html/${PREFIX}

