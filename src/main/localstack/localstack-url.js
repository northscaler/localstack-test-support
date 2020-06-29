'use strict'

const fs = require('fs')
const MissingRequiredArgumentError = require('@northscaler/error-support/errors/MissingRequiredArgumentError')

const DEFAULT_HEALTH_PORT_FILENAME = `${__dirname}/default-localstack-test-health-port`
const DEFAULT_HEALTH_PORT = parseInt(fs.readFileSync(DEFAULT_HEALTH_PORT_FILENAME))

module.exports = ({
  protocol = 'http://',
  host = 'localhost',
  port = DEFAULT_HEALTH_PORT,
  endpoint = 'health'
} = {}) => {
  protocol = protocol || throw new MissingRequiredArgumentError({ msg: 'protocol' })
  if (!protocol.endsWith('://')) protocol = `${protocol}://`

  host = host || throw new MissingRequiredArgumentError({ msg: 'host' })

  const url = `${protocol}${host}:${port}/${endpoint}`

  return url
}
