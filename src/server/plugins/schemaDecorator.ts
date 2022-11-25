import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'

module.exports = fp(async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
  const notificationSchema = {
    $id: 'notification',
    description: 'Notification Schema',
    type: 'object',
    properties: {
      id: { type: 'string' },
      subject: { type: 'string' },
      message: { type: 'string' },
      recipentId: { type: 'string' },
      recipentMail: { type: 'string' },
      senderId: { type: 'string' },
      severity: { type: 'number' },
      readed: { type: 'string', description: 'Timestamp string representation' }
    }
  }
  const userSchema = {
    $id: 'user',
    description: 'User Schema',
    type: 'object',
    properties: {
      name: { type: 'string' },
      login: { type: 'string' },
      password: { type: 'string' },
      mail: { type: 'string' },
      permissions: {
        type: 'array',
        items: {
          permission: {
            type: 'string'
          }
        }
      }
    }
  }

  fastify.addSchema(notificationSchema)
  // fastify.addSchema(userSchema)
})
