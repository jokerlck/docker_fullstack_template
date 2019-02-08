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

    RUN npm install -g http-server

    WORKDIR /rchk_app_production/front-end/

    COPY package*.json /rchk_app_production/front-end/

    RUN npm install

    COPY . .

    RUN npm run build

    EXPOSE 8080

    CMD [ "http-server", "dist" ]

## Step 4

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
    # bind local port 8080 to docker port 8080
    docker run -d -p 8888:8080 --name $containerName $imageName

## Step 5

Create docker-compose.yml

    // docker-compose.yml

    version: "3"

    services:
        frontend:
            build: ./frontend
            container_name: micro_rdapps_frontend_compose_docker_container
            volumes:
                - ./frontend:/rchk_app_production/front-end/
            ports:
                - '9000:8080'

## Step 6

Create Rebuild Shell Script

    // rebuild.sh

    #!/bin/bash

    docker-compose down

    docker-compose build --no-cache

    docker-compose up -d --force-recreate


## Step 7

Make sure there is no docker running

    docker ps

Stop docker

    docker stop <container id>

    docker rm -f <container name>

Start

    docker-compose build

    docker-compose up


# File Changes

如果改左code, local run

    npm run build

之後就ok, 因為volume 果度將local file mount落 docker file

所以local file 改 = docker file 改

---

有package要local down左先

    npm install --save <package-name>


# DB

# Cronjob

# Error message

# Load balance