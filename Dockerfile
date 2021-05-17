FROM node:14

RUN mkdir /app
WORKDIR /app

COPY ./server/package*.json ./server/
COPY ./client/package*.json ./client/

RUN npm install --prefix ./client
RUN npm install --prefix ./server

EXPOSE 3001

ENTRYPOINT ["npm", "run", "start", "--prefix", "./server"]