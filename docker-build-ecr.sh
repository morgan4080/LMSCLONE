#!/bin/bash

echo '===> Compiling & Packaging prestaapps/scoring-ui ...'

GIT_BRANCH=$(git name-rev --name-only HEAD | sed "s/~.*//")
GIT_COMMIT=$(git rev-parse HEAD)
APP_VERSION=$(git describe --always)
GIT_DIRTY='false'
BUILD_CREATOR=$(git config user.email)
BUILD_NUMBER="${BUILDKITE_BUILD_NUMBER-0}"
# Whether the repo has uncommitted changes
if [[ $(git status -s) ]]; then
    GIT_DIRTY='true'
fi

echo "APP VERSION = $APP_VERSION"

echo '===> Building prestaapps/scoring-ui docker image...'
#Oauth service
docker build \
  -t 665804139994.dkr.ecr.us-west-2.amazonaws.com/prestaapps/scoring-ui:latest \
  -t 665804139994.dkr.ecr.us-west-2.amazonaws.com/prestaapps/scoring-ui:"$APP_VERSION" \
  --build-arg GIT_BRANCH="$GIT_BRANCH" \
  --build-arg GIT_COMMIT="$GIT_COMMIT" \
  --build-arg GIT_DIRTY="$GIT_DIRTY" \
  --build-arg BUILD_CREATOR="$BUILD_CREATOR" \
  --build-arg BUILD_NUMBER="$BUILD_NUMBER" \
  --build-arg env=production \
  .
echo "Done building prestaapps/scoring-ui: $APP_VERSION"
# Upload to ecr only if -a option is active
if  [[ $1 = "-a" ]]; then
  docker push 665804139994.dkr.ecr.us-west-2.amazonaws.com/prestaapps/scoring-ui:"$APP_VERSION"
  docker push 665804139994.dkr.ecr.us-west-2.amazonaws.com/prestaapps/scoring-ui:latest
fi;






