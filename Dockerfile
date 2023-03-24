FROM node:10.16.0-alpine

RUN mkdir -p /var/www/html
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN yarn install
RUN yarn install react-scripts -g

CMD ["yarn", "start"]