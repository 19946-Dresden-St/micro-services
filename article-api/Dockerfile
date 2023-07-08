FROM node:20-alpine as build

COPY package.json .
COPY package-lock.json .

RUN npm install 
RUN npm run build


FROM node:latest as prod

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

COPY --from=build dist dist

RUN npm install --legacy-peer-deps

CMD [ "npm run start" ]
 