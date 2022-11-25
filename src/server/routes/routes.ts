import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'
import { getNotificationController } from '../controllers/getNotification'
import { getAllNotificationsController } from '../controllers/getAllNotifications'
import { patchNotificationController } from '../controllers/patchNotification'
import { postNotificationController } from '../controllers/postNotification'
import {
  getNotificationsSchema,
  postNotificationSchema,
  getNotificationSchema,
  patchNotificationSchema,
  getUnreadNotificationsSchema
} from '../schemas/notification'
import { getUnreadNotificationsController } from '../controllers/getUnreadNotifications'

export const router = async (app: FastifyInstance, _opts: FastifyPluginOptions): Promise<any> => {
  app.route({
    url: '/notification',
    method: 'POST',
    schema: postNotificationSchema,
    handler: async (req: FastifyRequest, res: FastifyReply) => postNotificationController.exec(req, res)
  })

  app.route({
    url: '/notification/:notificationId',
    method: 'GET',
    schema: getNotificationSchema,
    handler: async (req: FastifyRequest, res: FastifyReply) => getNotificationController.exec(req, res)
  })

  app.route({
    url: '/notification/user/:userId/all',
    method: 'GET',
    schema: getNotificationsSchema,
    handler: async (req: FastifyRequest, res: FastifyReply) => getAllNotificationsController.exec(req, res)
  })

  app.route({
    url: '/notification/user/:userId/unread',
    method: 'GET',
    schema: getUnreadNotificationsSchema,
    handler: async (req: FastifyRequest, res: FastifyReply) => getUnreadNotificationsController.exec(req, res)
  })

  app.route({
    url: '/notification/:notificationId',
    method: 'POST',
    schema: patchNotificationSchema,
    handler: async (req: FastifyRequest, res: FastifyReply) => patchNotificationController.exec(req, res)
  })
}
