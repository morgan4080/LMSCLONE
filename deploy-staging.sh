#!/bin/bash

CONTAINER_ID=$(docker ps | grep presta-lms | awk '{ print $1 }')
IMAGE_ID=$(docker image ls | grep presta-lms | awk '{ print $3 }')

if [ "$CONTAINER_ID" ] && [ "$IMAGE_ID" ]; then
    docker stop "$CONTAINER_ID" &&
     docker rmi "$IMAGE_ID" -f && git pull && git checkout master &&
      docker build --build-arg env=staging -t presta-lms/latest . &&
       docker run -d -p 4080:80 presta-lms/latest
else
  git pull && git checkout master && docker build --build-arg env=staging -t presta-lms/latest . &&
         docker run -d -p 4080:80 presta-lms/latest
fi
