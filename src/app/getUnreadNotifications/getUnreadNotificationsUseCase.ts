import { BaseUseCase } from '../../core/BaseUseCase'
import { NotificationRepository } from '../../domain/notification.repository'
import { IGetUnreadNotificationsDTO, IGetUnreadNotificationsResult } from './getUnreadNotifications.dto'

interface UseCaseResult {
  success: boolean
  value: IGetUnreadNotificationsResult | null
  error?: Error
  errorType?: string
}

export class GetUnreadNotificationsUseCase extends BaseUseCase<IGetUnreadNotificationsDTO, UseCaseResult> {
  private readonly notificationRepository: NotificationRepository

  constructor(notificationRepository: NotificationRepository) {
    super()
    this.notificationRepository = notificationRepository
  }
  public async exec(getNotificationsDTO: IGetUnreadNotificationsDTO): Promise<UseCaseResult> {
    try {
      const notifications = await this.notificationRepository.getUnreadNotifications(
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
