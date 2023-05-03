FROM node:20-alpine3.16 as node

WORKDIR /app

RUN apk update && apk upgrade

RUN mkdir -p hades-fe

COPY ./ ./hades-fe

WORKDIR /app/hades-fe
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/hades-fe/dist/hades-fe /usr/share/nginx/html
COPY --from=node /app/hades-fe/nginx.conf /etc/nginx/conf.d/default.conf
