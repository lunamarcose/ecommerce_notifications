import { FastifyReply, FastifyRequest } from 'fastify'
import { IGetNotificationsResult } from '../../../app/getAllNotifications/getAllNotifications.dto'
import { GetNotificationsUseCase } from '../../../app/getAllNotifications/getAllNotificationsUseCase'
import { BaseController } from '../../../core/BaseController'

export class GetAllNotificationsController extends BaseController {
  private getNotificationUseCase: GetNotificationsUseCase
  constructor(getNotificationUseCase: GetNotificationsUseCase) {
    super()
    this.getNotificationUseCase = getNotificationUseCase
  }
  public async exec(req: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      // @ts-ignore
      const { userId } = req.params
      // @ts-ignore
      const { offset, limit } = req.query
      const result = await this.getNotificationUseCase.exec({ user: userId, offset: offset, limit: limit })
      if (!result.success) {
        switch (result.errorType) {
          default:
            return this.internalServerError(reply, result.error?.message)
        }
      }
      const notifications: IGetNotificationsResult = result.value!
      return await this.ok<IGetNotificationsResult>(reply, notifications)
    } catch (error: any) {
      console.log(error)
      return this.internalServerError(reply, error.message)
    }
  }
}
