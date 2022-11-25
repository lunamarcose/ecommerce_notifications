import { FastifyReply, FastifyRequest } from 'fastify'
import { ReadNotificationUseCase } from '../../../app/readNotification/readNotificationUseCase'
import { BaseController } from '../../../core/BaseController'
import { INotification } from '../../../domain/notification.entity'

export class PatchNotificationController extends BaseController {
  private readNotificationUseCase: ReadNotificationUseCase
  constructor(getNotificationUseCase: ReadNotificationUseCase) {
    super()
    this.readNotificationUseCase = getNotificationUseCase
  }
  public async exec(req: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      // @ts-ignore
      const { notificationId } = req.params
      const result = await this.readNotificationUseCase.exec({ notificationId: notificationId })
      if (!result.success) {
        switch (result.errorType) {
          default:
            return this.internalServerError(reply, result.error?.message)
        }
      }
      const notification: INotification = result.value!
      return await this.ok<INotification>(reply, notification)
    } catch (error: any) {
      console.log(error)
      return this.internalServerError(reply, error.message)
    }
  }
}
