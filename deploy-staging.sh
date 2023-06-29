#!/bin/bash

docker stop `docker ps | grep presta-lms | awk '{ print $1 }'` && docker rmi `docker image ls | grep presta-lms | awk '{ print $3 }'` -f && git pull && docker build --build-arg env=staging -t presta-lms/latest . && docker run -d -p 4080:80 presta-lms/latest

