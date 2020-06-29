#!/usr/bin/env sh

THIS_DIR="$(cd "$(dirname "$0")"; pwd)"

DEFAULT_CONTAINER="$(cat "$THIS_DIR/default-localstack-test-container")"
CONTAINER="${1:-$DEFAULT_CONTAINER}"

DEFAULT_PORT="$(cat "$THIS_DIR/default-localstack-test-port")"
DEFAULT_HEALTH_PORT="$(cat "$THIS_DIR/default-localstack-test-health-port")"
PORT=${2:-$DEFAULT_PORT}
HEALTH_PORT=${3:-$DEFAULT_HEALTH_PORT}

RUNNING=$(docker inspect --format="{{ .State.Running }}" "$CONTAINER" 2> /dev/null)

if [ $? -eq 1 ] || [ "$RUNNING" == "false" ]; then
  $CMD
    echo "container '$CONTAINER' does not exist or is stopped - recreating"
  # make sure it's gone
  CONTAINER_ID=$(docker ps -a | grep "$CONTAINER" | awk '{ print $1}')
  if [[ -n "${CONTAINER_ID}" ]]; then
    echo "Force removing container with id $CONTAINER_ID"
    docker rm --force "$CONTAINER_ID"
  else
    echo "No mongo container exists"
  fi

  CMD="docker run --name $CONTAINER -p $PORT:4566 -p $HEALTH_PORT:8080 -d localstack/localstack"
  echo "$CMD"

  $CMD
fi
