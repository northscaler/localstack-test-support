'use strict'

const fs = require('fs')
const startLocalstack = require('./start-localstack')

const fn = async ({
  containerName = fn.defaultContainerName,
  port = fn.defaultPort,
  containerLabel = fn.defaultContainerLabel
} = {}) => {
  await startLocalstack({ scriptArgs: [containerName, port, containerLabel] })
}

fn.defaultPort = parseInt(fs.readFileSync(`${__dirname}/default-localstack-test-port`))
fn.defaultContainerName = fs.readFileSync(`${__dirname}/default-localstack-test-container`)
fn.defaultContainerLabel = fs.readFileSync(`${__dirname}/default-localstack-test-container-label`)

module.exports = fn
