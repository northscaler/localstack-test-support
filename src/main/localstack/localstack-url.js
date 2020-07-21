'use strict'

const fs = require('fs')
const MissingRequiredArgumentError = require('@northscaler/error-support/errors/MissingRequiredArgumentError')

const DEFAULT_PORT_FILENAME = `${__dirname}/default-localstack-test-port`
const DEFAULT_PORT = parseInt(fs.readFileSync(DEFAULT_PORT_FILENAME))

module.exports = ({
  protocol = 'http://',
  host = 'localhost',
  endpoint = 'health',
  port = DEFAULT_PORT
} = {}) => {
  protocol = protocol || throw new MissingRequiredArgumentError({ msg: 'protocol' })
  if (!protocol.endsWith('://')) protocol = `${protocol}://`

  host = host || throw new MissingRequiredArgumentError({ msg: 'host' })

  const url = `${protocol}${host}:${port}/${endpoint}`

  return url
}
