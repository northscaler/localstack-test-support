/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect
const http = require('request-promise-native')
const m = require('../../../main')
const localstackHealthUrl = require('../../../main/localstack/localstack-url')
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

describe('integration tests of localstack', function () {
  describe('localstack-connect', function () {
    it('should work', async function () {
      if (process.env.CI) {
        console.log('not running tests because in CI pipeline')
        return
      }

      this.timeout(20000)
      const containerName = process.env.LOCALSTACK_TEST_SUPPORT_LOCALSTACK_CONTAINER_NAME || m.localstackConnect.defaultContainerName
      const port = process.env.LOCALSTACK_TEST_SUPPORT_LOCALSTACK_PORT || m.localstackConnect.defaultPort
      await m.localstackConnect({ containerName, port })

      await pause(5000)
      const status = await http.get({
        url: localstackHealthUrl({
          port: process.env.LOCALSTACK_TEST_SUPPORT_LOCALSTACK_HEALTH_PORT || m.localstackConnect.defaultHealthPort
        })
      })

      expect(status).to.be.ok()

      const health = JSON.parse(status)
      expect(health.services).to.be.ok()
      expect(health.services.apigateway === 'starting' || health.services.apigateway === 'running').to.be.true()
    })
  })
})
