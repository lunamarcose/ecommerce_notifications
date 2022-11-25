import { BaseUseCase } from '../../core/BaseUseCase'
import { NotificationRepository } from '../../domain/notification.repository'
import { IGetNotificationsDTO, IGetNotificationsResult } from './getAllNotifications.dto'

interface UseCaseResult {
  success: boolean
  value: IGetNotificationsResult | null
  error?: Error
  errorType?: string
}

export class GetNotificationsUseCase extends BaseUseCase<IGetNotificationsDTO, UseCaseResult> {
  private readonly notificationRepository: NotificationRepository

  constructor(notificationRepository: NotificationRepository) {
    super()
    this.notificationRepository = notificationRepository
  }
  public async exec(getNotificationsDTO: IGetNotificationsDTO): Promise<UseCaseResult> {
    try {
      const notifications = await this.notificationRepository.getNotifications(
        getNotificationsDTO.user,
        getNotificationsDTO.offset,
        getNotificationsDTO.limit
      )
      return {
        success: true,
        value: notifications
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
