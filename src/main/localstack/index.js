'use strict'

const localstackConnect = require('./localstack-connect')

module.exports = {
  localstackConnect,
  defaultPort: localstackConnect.defaultPort,
  defaultHealthPort: localstackConnect.defaultHealthPort,
  defaultContainerName: localstackConnect.defaultContainerName,
  defaultContainerLabel: localstackConnect.defaultContainerLabel
}
