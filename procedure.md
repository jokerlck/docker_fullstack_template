# Front End Init

## Step 1

Init vue project

    vue create <proj-name>

Add Router

    vue add router

## Step 2

Build Project

    npm run build

## Step 3

Create Dockerfile

    // Dockerfile

    FROM node:10.15.1-alpine

    WORKDIR /rchk_app_production/front-end/

    COPY package*.json /rchk_app_production/front-end/

    RUN npm install

    COPY . .

    RUN npm run build


## Step 4 (Optional)

Create Rebuild Shell Script

    // rebuild-docker.sh

    #!/bin/bash

    # name of image
    imageName=micro_rdapps_frontend_docker_img

    # name of container
    containerName=micro_rdapps_frontend_docker_container

    docker build -t $imageName .

    echo ========== Delete old container...
    docker rm -f $containerName

    echo ========== Run new container...
    # bind local port 8888 to docker port 8080
    docker run -d -p 8888:8080 --name $containerName $imageName

# Back End Init

## Step 1

You can use the existing rcapps_server

## Step 2

Create Dockerfile

    FROM node:10.15.1-alpine

    WORKDIR /rchk_app_production/back-end/

    COPY package*.json /rchk_app_production/back-end/

    RUN npm install

    COPY . .

    EXPOSE 3080

    # Uncomment - when you are using local database

    # Start backend service until the database has been setup

    # ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

    # RUN chmod +x /wait

    # CMD /wait && npm start

    CMD npm start

## Step 3 (Optional)

Create Rebuild Shell Script

    #!/bin/bash

    # name of image
    imageName=micro_rdapps_backend_docker_img

    # name of container
    containerName=micro_rdapps_backend_docker_container

    docker build -t $imageName .

    echo ========== Delete old container...
    docker rm -f $containerName

    echo ========== Run new container...
    # bind local port 3080 to docker port 7080
    docker run -d -p 3080:7080 --name $containerName $imageName


# Nginx

## Step 1

Create Nginx Config File

    // nginx.conf

    worker_processes  1;

    pid        /var/run/nginx.pid;


    events {
        worker_connections  1024;
    }


    http {
        include       mime.types;
        default_type  application/octet-stream;

        sendfile        on;

        keepalive_timeout  65;

        include /etc/nginx/conf.d/*.conf;

        server {

            listen 80;

            server_name  _;

            location / {
                root   html;
                index  index.html index.htm;
            }
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
                root   html;
            }
        }
    }

## Step 2

Create Website Config File

    // rdapps.conf

    server {
        listen       80;
        server_name  dev.docker.rchk.edu.hk;
        root    /rchk_app_production/front-end/dist;

        location / {
                index           index.html;
        }

        location /api/rcapps/ {
                proxy_pass      http://backend:3080/api/rcapps/;
        }
    }

    // backend -> name of service in docker-compose.yml

## Step 3 (Optional)

Create Rebuild Shell Script

    #!/bin/bash

    # name of image
    imageName=nginx_img

    # name of container
    containerName=nginx_container

    docker build -t $imageName .

    echo ========== Delete old container...
    docker rm -f $containerName

    echo ========== Run new container...

    docker run -d -p 6999:80 --name $containerName $imageName

# Docker Compose

## Step 1

Create YML file (production version)

    # docker-compose.yml

    version: "3"

    services:
        backend:
            build: ./backend
            container_name: micro_rdapps_backend_compose_docker_container
            volumes:
                - ./backend:/rchk_app_production/back-end/
            ports:
                - '3080:3080'
        frontend:
            build: ./frontend
            container_name: micro_rdapps_frontend_compose_docker_container
            volumes:
                - ./frontend:/rchk_app_production/front-end/
            ports:
                - '8080:8080'
        nginx:
            build: ./nginx
            container_name: micro_rdapps_nginx_docker_container
            volumes:
                - ./nginx/nginx.conf:/etc/nginx/nginx.conf
                - ./nginx/rdapps.conf:/etc/nginx/conf.d/rdapps.conf
                - ./frontend:/rchk_app_production/front-end/
            ports:
                - '6999:80'
            depends_on:
                - frontend
                - backend

## Step 2

Create YML file (development version)

    # docker-compose.yml

    version: "3"

    services:
        database:
            build: ./database
            container_name: micro_rdapps_db_docker_container
            restart: always
            volumes:
                - ./database:/rchk_app_production/database/
        backend:
            build: ./backend
            container_name: micro_rdapps_backend_compose_docker_container
            volumes:
                - ./backend:/rchk_app_production/back-end/
            ports:
                - '3080:3080'
            depends_on:
                - database
            links:
                - database
            environment:
            WAIT_HOSTS: database:3306
        frontend:
            build: ./frontend
            container_name: micro_rdapps_frontend_compose_docker_container
            volumes:
                - ./frontend:/rchk_app_production/front-end/
            ports:
                - '8080:8080'
        nginx:
            build: ./nginx
            container_name: micro_rdapps_nginx_docker_container
            volumes:
                - ./nginx/nginx.conf:/etc/nginx/nginx.conf
                - ./nginx/rdapps.conf:/etc/nginx/conf.d/rdapps.conf
                - ./frontend:/rchk_app_production/front-end/
            ports:
                - '6999:80'
            depends_on:
                - frontend
                - backend
                - database

## Note

volume here means mounted folder

Port should be same as frontend/ backend config and Dockerfile

## Step 3

Create Rebuild Shell Script

    docker-compose down

    docker-compose build --no-cache

    docker-compose up -d --force-recreate


# File Changes

如果改左code, local run

    npm run build

之後就ok, 因為volume 果度將local file mount落 docker file

所以local file 改 = docker file 改

---

有package要local down左先

    npm install --save <package-name>

# Delete non-running container/image

    # List dangling images

    docker images -f dangling=true

    # Removing dangling images

    docker rmi $(docker images -q -f dangling=true)

    # List stopped containers

    docker ps -a -f status=exited

    # Removing stopped containers

    docker rm $(docker ps -a -q -f status=exited)

    # List dangling volumes

    docker volume ls -f dangling=true

    # Removing dangling volumes

    docker volume rm $(docker volume ls -q -f dangling=true)

    # Removing container with ID xxx

    docker rm -f {container_ID}


# DB

Database 應該用external

用container裝DB -> 如果container restart/fail/有其他問題 -> data會冇晒

所以

development -> 用export sql, add落container做野

production -> 連去database server

# Cronjob

# Error message

# Load balance