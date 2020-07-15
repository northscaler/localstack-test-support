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
  if [ -z "$PORT" ]; then
    PORT="$(cat $THIS_DIR/default-localstack-test-port)"
  fi
  HEALTH_PORT=${3:-$LOCALSTACK_TEST_SUPPORT_LOCALSTACK_HEALTH_PORT}
  if [ -z "$HEALTH_PORT" ]; then
    PORT="$(cat $THIS_DIR/default-localstack-test-health-port)"
  fi
  CONTAINER_LABEL=${4:-$LOCALSTACK_TEST_SUPPORT_LOCALSTACK_CONTAINER_LABEL}
  if [ -z "$CONTAINER_LABEL" ]; then
    CONTAINER_LABEL="$(cat $THIS_DIR/default-localstack-test-container-label)"
  fi
  if [ -z "$(docker ps --quiet --filter name=$CONTAINER)" ]; then
    "$THIS_DIR/start-localstack-container.sh" "$CONTAINER" $PORT $HEALTH_PORT $CONTAINER_LABEL
  fi
fi
