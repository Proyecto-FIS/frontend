FROM node:15-alpine

WORKDIR /frontend
COPY package.json .
COPY package-lock.json .
RUN npm i

COPY src src
COPY public public

# start app
RUN npm run build

CMD ["sh", "-c","npx serve -l $PORT -s build"]
