import { BaseUseCase } from '../../core/BaseUseCase'
import { INotification } from '../../domain/notification.entity'
import { NotificationRepository } from '../../domain/notification.repository'
import { NotificationValue } from '../../domain/notification.value'
import { UserRepository } from '../../domain/user.repository'
import { ICreateNotificationDTO } from './createNotification.dto'

interface UseCaseResult {
  success: boolean
  value: INotification | null
  error?: Error
  errorType?: string
}

export class CreateNotificationUseCase extends BaseUseCase<ICreateNotificationDTO, UseCaseResult> {
  private readonly notificationRepository: NotificationRepository
  private readonly userRepository: UserRepository

  constructor(notificationRepository: NotificationRepository, userRepository: UserRepository) {
    super()
    this.notificationRepository = notificationRepository
    this.userRepository = userRepository
  }
  public async exec(createNotificationDTO: ICreateNotificationDTO): Promise<UseCaseResult> {
    try {
      const { recipent, subject, message, severity, sender } = createNotificationDTO
      const user = await this.userRepository.getUser(recipent)
      if (!user) {
        return {
          success: false,
          value: null,
          error: new Error('Ha ocurrido un error inesperado, intente más tarde.'),
          errorType: 'Unexpected'
        }
      }
      const recipentMail = user.mail
      const notificationValue = new NotificationValue(recipent, recipentMail, subject, message, severity, sender)
      const notification = await this.notificationRepository.createNotification(notificationValue)
      return {
        success: true,
        value: notification
      }
    } catch (error: any) {
      console.log(error)
      return {
        success: false,
        value: null,
        error: new Error('Ha ocurrido un error inesperado, intente más tarde.'),
        errorType: 'Unexpected'
      }
    }
  }
}
