import { FastifyReply, FastifyRequest } from 'fastify'
import { IGetUnreadNotificationsResult } from '../../../app/getUnreadNotifications/getUnreadNotifications.dto'
import { GetUnreadNotificationsUseCase } from '../../../app/getUnreadNotifications/getUnreadNotificationsUseCase'
import { BaseController } from '../../../core/BaseController'

export class GetUnreadNotificationsController extends BaseController {
  private getUnreadNotificationUseCase: GetUnreadNotificationsUseCase
  constructor(getUnreadNotificationUseCase: GetUnreadNotificationsUseCase) {
    super()
    this.getUnreadNotificationUseCase = getUnreadNotificationUseCase
  }
  public async exec(req: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      // @ts-ignore
      const { userId } = req.params
      // @ts-ignore
      const { offset, limit } = req.query
      const result = await this.getUnreadNotificationUseCase.exec({ user: userId, offset: offset, limit: limit })
      if (!result.success) {
        switch (result.errorType) {
          default:
            return this.internalServerError(reply, result.error?.message)
        }
      }
      const notifications: IGetUnreadNotificationsResult = result.value!
      return await this.ok<IGetUnreadNotificationsResult>(reply, notifications)
    } catch (error: any) {
      console.log(error)
      return this.internalServerError(reply, error.message)
    }
  }
}
