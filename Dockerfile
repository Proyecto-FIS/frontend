FROM node:15-alpine

WORKDIR /frontend
COPY package.json .
COPY package-lock.json .
RUN npm i

COPY src src
COPY public public

RUN npm run build

ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c","npx serve -l $PORT -s build"]
