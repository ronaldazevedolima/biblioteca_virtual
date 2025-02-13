FROM node:20.18-alpine3.21

WORKDIR /app/back-end

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]