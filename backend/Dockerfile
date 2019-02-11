FROM node:10.15.1-alpine

WORKDIR /rchk_app_production/back-end/

COPY package*.json /rchk_app_production/back-end/

RUN npm install

COPY . .

EXPOSE 3080

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

# RUN chmod +x /wait

# CMD /wait && npm start

CMD npm start

