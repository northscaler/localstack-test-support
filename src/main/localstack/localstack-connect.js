'use strict'

const fs = require('fs')
const startLocalstack = require('./start-localstack')

const fn = async ({
  containerName = fn.defaultContainerName,
  port = fn.defaultPort,
  healthPort = fn.defaultHealthPort,
  containerLabel = fn.defaultContainerLabel
} = {}) => {
  await startLocalstack({ scriptArgs: [containerName, port, healthPort, containerLabel] })
}

fn.defaultPort = parseInt(fs.readFileSync(`${__dirname}/default-localstack-test-port`))
fn.defaultHealthPort = parseInt(fs.readFileSync(`${__dirname}/default-localstack-test-health-port`))
fn.defaultContainerName = fs.readFileSync(`${__dirname}/default-localstack-test-container`)
fn.defaultContainerLabel = fs.readFileSync(`${__dirname}/default-localstack-test-container-label`)

module.exports = fn
