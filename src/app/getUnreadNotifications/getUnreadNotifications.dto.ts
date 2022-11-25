import { INotification } from '../../domain/notification.entity'

export interface IGetUnreadNotificationsDTO {
  user: string
  offset: number
  limit: number
}

export interface IGetUnreadNotificationsResult {
  notifications: Array<INotification>
  metadata: {
    count: number
    offset: number
    limit: number
    total: number
  }
}
