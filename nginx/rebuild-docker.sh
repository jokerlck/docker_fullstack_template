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
