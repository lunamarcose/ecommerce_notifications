import { BaseUseCase } from '../../core/BaseUseCase'
import { INotification } from '../../domain/notification.entity'
import { NotificationRepository } from '../../domain/notification.repository'
import { NotificationValue } from '../../domain/notification.value'
import { IReadNotificationDTO } from './readNotification.dto'

interface UseCaseResult {
  success: boolean
  value: INotification | null
  error?: Error
  errorType?: string
}

export class ReadNotificationUseCase extends BaseUseCase<IReadNotificationDTO, UseCaseResult> {
  private readonly notificationRepository: NotificationRepository

  constructor(notificationRepository: NotificationRepository) {
    super()
    this.notificationRepository = notificationRepository
  }
  public async exec(readNotificationDTO: IReadNotificationDTO): Promise<UseCaseResult> {
    try {
      const { notificationId } = readNotificationDTO
      const notificationUpdated = await this.notificationRepository.readNotification(notificationId)
      return {
        success: true,
        value: notificationUpdated
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
