FROM node:14

RUN mkdir /app
WORKDIR /app

COPY ./server/package*.json ./server/

RUN npm ci --prefix ./server
RUN npm install -g nodemon

EXPOSE 3001

ENTRYPOINT ["npm", "run", "dev", "--prefix", "./server"]