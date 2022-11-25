import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateNotificationUseCase } from '../../../app/createNotification/createNotificationUseCase'
import { BaseController } from '../../../core/BaseController'
import { INotification } from '../../../domain/notification.entity'

export class PostNotificationController extends BaseController {
  private createNotificationUseCase: CreateNotificationUseCase
  constructor(createNotificationUseCase: CreateNotificationUseCase) {
    super()
    this.createNotificationUseCase = createNotificationUseCase
  }
  public async exec(req: FastifyRequest, reply: FastifyReply): Promise<any> {
    try {
      // @ts-ignore
      const { recipentId, subject, message, severity, senderId } = req.body
      const result = await this.createNotificationUseCase.exec({
        recipent: recipentId,
        subject: subject,
        message: message,
        severity: severity,
        sender: senderId
      })
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
