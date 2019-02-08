#!/bin/bash
docker-compose down

docker-compose build --no-cache

docker-compose up -d --force-recreate

# 要咁樣run 先會update到D code

# docker run $image_name [command] -> 可以係docker image 入面run cmd

# docker attach $image_name

# docker exec $container_name [command] -> 可以係docker container 入面run cmd