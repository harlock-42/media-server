FROM node:18-alpine

ARG MEDIA_PATH

ENV MEDIA_PATH=${MEDIA_PATH}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]