## Production Build
```
docker build -t presta-lms/latest .
```
## Staging Build
```
docker build --build-arg env=staging -t presta-lms/latest .
```
## Local Build
```
docker build --build-arg env=local -t presta-lms/latest .
```