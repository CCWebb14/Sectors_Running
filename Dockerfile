FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

EXPOSE 6000

CMD ["npm", "run", "dev"]