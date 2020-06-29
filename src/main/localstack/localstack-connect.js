'use strict'

const fs = require('fs')
const startLocalstack = require('./start-localstack')

const fn = async ({
  containerName = fn.defaultContainerName,
  port = fn.defaultPort
} = {}) => {
  await startLocalstack({ scriptArgs: [containerName, port] })
}

fn.defaultPort = parseInt(fs.readFileSync(`${__dirname}/default-localstack-test-port`))
fn.defaultHealthPort = parseInt(fs.readFileSync(`${__dirname}/default-localstack-test-health-port`))
fn.defaultContainerName = fs.readFileSync(`${__dirname}/default-localstack-test-container`)

module.exports = fn
