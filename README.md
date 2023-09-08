
## README ON HOW TO USE THE APP
```
 Clone the repo,
 npm install
 npm start
 Pull the Latest code from the repo
```

## build stage
```
FROM node:lts-alpine as build-stage
WORKDIR /lms
COPY package*.json ./
RUN npm install
COPY ...
ARG env=production{specify the environment}
RUN npm run ${env}
COPY ...
```
## production stage
```
FROM nginx:stable-alpine as production-stage
COPY ./.nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /lms/dist /usr/share/nginx/html/lms
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
## Building and Running the Application with Docker

To build and run the application using Docker, follow these steps:

### Step 1: Build the Docker Image
Use the following command to build a Docker image for the application, specifying the desired environment (in this case, "staging"):
bash
docker build --build-arg env=staging -t presta-lms/latest .
docker build: Builds a Docker image.
````
--build-arg env=staging: Sets the environment to "staging" during the image build.
-t presta-lms/latest: Tags the image as "presta-lms/latest."
````
#### Step 2:Run a Docker Container
After successfully building the Docker image, you can run a Docker container based on that image. This command maps port 4080 on your host to port 80 in the container and runs the container in the background:
bash
````
Copy code
docker run -d -p 4080:80 presta-lms/latest
docker run: Runs a Docker container.
-d: Detaches the container, running it in the background.
-p 4080:80: Maps port 4080 on your host to port 80 in the container.
presta-lms/latest: Specifies the Docker image to use for the container.
````

Reference on these files
````
deploy-staging.sh
deploy-build-ecr.sh
````

Now, the application should be accessible at http://localhost:4080 in your web browser.


