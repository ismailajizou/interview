FROM node:20-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT=5173
EXPOSE 5173

CMD npm run dev -- --host
