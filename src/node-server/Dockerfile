FROM node:18 

WORKDIR /app 

COPY src/node-server/package*.json ./ 

RUN npm install 

COPY src/node-server . 

CMD ["node", "app.js"]