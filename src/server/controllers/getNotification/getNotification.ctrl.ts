import { FastifyReply, FastifyRequest } from 'fastify'
import { GetNotificationUseCase } from '../../../app/getNotification/getNotificationUseCase'
import { BaseController } from '../../../core/BaseController'
import { INotification } from '../../../domain/notification.entity'

export class GetNotificationController extends BaseController {
  private getNotificationUseCase: GetNotificationUseCase
  constructor(getNotificationUseCase: GetNotificationUseCase) {
    super()
    this.getNotificationUseCase = getNotificationUseCase
  }
  public async exec(req: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      // @ts-ignore
      const { notificationId } = req.params
      const result = await this.getNotificationUseCase.exec({ notificationId: notificationId })
      if (!result.success) {
        switch (result.errorType) {
          case 'NotFound':
            return this.notFound(reply, result.error?.message)
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
