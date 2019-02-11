#!/bin/bash
docker-compose down

docker-compose build --no-cache

docker-compose up -d --force-recreate

# 要咁樣run 先會update到D code

# docker run $image_name [command] -> 可以係docker image 入面run cmd

# docker attach $image_name

# docker exec $container_name [command] -> 可以係docker container 入面run cmd

# List dangling images

# docker images -f dangling=true

# Removing dangling images

# docker rmi $(docker images -q -f dangling=true)

# List stopped containers

# docker ps -a -f status=exited

# Removing stopped containers

# docker rm $(docker ps -a -q -f status=exited)

# List dangling volumes

# docker volume ls -f dangling=true

# Removing dangling volumes

# docker volume rm $(docker volume ls -q -f dangling=true)
