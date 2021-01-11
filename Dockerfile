FROM node:15-alpine

WORKDIR /frontend
COPY package.json .
COPY package-lock.json .
RUN npm i

COPY src src
COPY public public

RUN npm run build

CMD ["sh", "-c", "npm run start:prod"]
