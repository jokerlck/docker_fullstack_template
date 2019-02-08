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
docker run -d -p 3081:8080 --name $containerName $imageName
