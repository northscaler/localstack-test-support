#!/usr/bin/env sh

THIS_DIR="$(cd "$(dirname "$0")"; pwd)"

if [ -n "$CI_COMMIT_SHA" ]; then # we're in CI pipeline
  echo 'in pipeline - localstack is started'
else
  CONTAINER=${1:-$LOCALSTACK_TEST_SUPPORT_LOCALSTACK_CONTAINER_NAME}
  if [ -z "$CONTAINER" ]; then
    CONTAINER="$(cat $THIS_DIR/default-localstack-test-container)"
  fi
  PORT=${2:-$LOCALSTACK_TEST_SUPPORT_LOCALSTACK_PORT}
  HEALTH_PORT=${3:-$LOCALSTACK_TEST_SUPPORT_LOCALSTACK_HEALTH_PORT}
  if [ -z "$PORT" ]; then
    PORT="$(cat $THIS_DIR/default-localstack-test-port)"
  fi
  if [ -z "$(docker ps --quiet --filter name=$CONTAINER)" ]; then
    "$THIS_DIR/start-localstack-container.sh" "$CONTAINER" $PORT $HEALTH_PORT
  fi
fi
