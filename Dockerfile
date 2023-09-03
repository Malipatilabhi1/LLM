FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.0.0

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 4500

CMD ["npm", "start"]