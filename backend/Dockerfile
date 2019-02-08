FROM node:10.15.1-alpine

WORKDIR /rchk_app_production/back-end/

COPY package*.json /rchk_app_production/back-end/

RUN npm install

COPY . .

EXPOSE 3080

CMD [ "npm", "start" ]
