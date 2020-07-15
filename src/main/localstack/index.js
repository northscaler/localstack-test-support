'use strict'

const localstackConnect = require('./localstack-connect')

module.exports = {
  localstackConnect,
  defaultPort: localstackConnect.defaultPort,
  defaultContainerName: localstackConnect.defaultContainerName,
  defaultContainerLabel: localstackConnect.defaultContainerLabel
}
