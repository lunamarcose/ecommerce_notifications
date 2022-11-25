import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { swaggerUIConfig } from '../config'

module.exports = fp(async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.register(require('@fastify/swagger-ui'), swaggerUIConfig)
})
