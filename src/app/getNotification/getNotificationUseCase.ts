import { BaseUseCase } from '../../core/BaseUseCase'
import { INotification } from '../../domain/notification.entity'
import { NotificationRepository } from '../../domain/notification.repository'
import { IGetNotificationDTO } from './getNotification.dto'

interface UseCaseResult {
  success: boolean
  value: INotification | null
  error?: Error
  errorType?: string
}

export class GetNotificationUseCase extends BaseUseCase<IGetNotificationDTO, UseCaseResult> {
  private readonly notificationRepository: NotificationRepository

  constructor(notificationRepository: NotificationRepository) {
    super()
    this.notificationRepository = notificationRepository
  }
  public async exec(getNotificationDTO: IGetNotificationDTO): Promise<UseCaseResult> {
    try {
      const notification = await this.notificationRepository.getNotification(getNotificationDTO.notificationId)
      if (!notification)
        return {
          success: false,
          value: null,
          error: new Error('No se encontraron resultados.'),
          errorType: 'NotFound'
        }
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
