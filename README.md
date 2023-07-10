## Production Build
# -a to push to ECR
```
./docker-build-ecr.sh -a
```

## Staging Build

```
docker build --build-arg env=staging -t presta-lms/latest .
```

## Local Build

```
docker build --build-arg env=local -t presta-lms/latest .
```
