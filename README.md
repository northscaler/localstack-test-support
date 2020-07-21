# `localstack-test-support`

Localstack integration testing utility that starts a local Docker container running Localstack if you're not running in a CI/CD pipeline.
This allows you to run integration tests locally in a manner similar to how they'd be run in the CI/CD pipeline. 
This module does nothing when running in a CI build pipeline, because Localstack should be configured as part of the build via something like [`.gitlab-ci.yml`'s `services`](https://docs.gitlab.com/ee/ci/yaml/#services) element.

This package is intended to be installed in your project in `devDependencies`.

> NOTE: requires a Unix-y shell (`/usr/bin/env sh`) to be available.
>This is not designed to run on Windows; PRs/MRs welcome.
>
> Requires localstack/localstack:0.11.3 or higher

Usage:
```javascript
const localstackConnect = require('@northscaler/localstack-test-support')

await localstackConnect()

```

## Configuration

The default configuration is pretty conventional, with the sole exception of the default port that Localstack will listen on for clients.
Instead of `4566`, which might already be in use on developers' machines when they run integration tests, the default configuration uses `14566`.
It is a `TODO` to search for an available port.

>NOTE: This module detects when it's running in a CI/CD pipeline by seeing if the environment variable `CI` is of nonzero length.

### Environment variables

The following environment variables can be set to configure the docker container:
* LOCALSTACK_TEST_SUPPORT_LOCALSTACK_PORT: visible client port on `localhost` to map to container port, default is content of `localstack/default-localstack-test-port`
* LOCALSTACK_TEST_SUPPORT_LOCALSTACK_CONTAINER_NAME: name of container, default is content of file `localstack/default-localstack-test-container`
* LOCALSTACK_TEST_SUPPORT_LOCALSTACK_CONTAINER_LABEL: The label of the [`localstack` Docker image](https://hub.docker.com/r/localstack/localstack), default is content of file `localstack/default-localstack-test-container-label`
