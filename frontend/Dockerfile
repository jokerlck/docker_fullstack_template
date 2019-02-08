FROM node:10.15.1-alpine

# HTTP server
# RUN npm install -g http-server

# setup a working directory in /rchk_app_production
WORKDIR /rchk_app_production/front-end/

COPY package*.json /rchk_app_production/front-end/

RUN npm install

COPY . .

RUN npm run build

# EXPOSE 8080

# CMD [ "http-server", "dist" ]