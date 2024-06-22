FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

ARG BUILD_COMMAND
ENV BUILD_COMMAND $BUILD_COMMAND

ARG PORT
ENV PORT $PORT

EXPOSE ${PORT}

CMD ["sh", "-c", "npm run ${BUILD_COMMAND}"]
