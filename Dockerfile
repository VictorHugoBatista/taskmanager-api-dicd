FROM node:12.15-alpine
USER root

WORKDIR /usr/src/app

COPY . .

RUN npm install -g npm &&\
    npm install -g @nestjs/cli &&\
    yarn install &&\
    yarn build

CMD ["node", "dist/main"]
