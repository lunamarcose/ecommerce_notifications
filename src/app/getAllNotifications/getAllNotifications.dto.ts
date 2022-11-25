import { INotification } from '../../domain/notification.entity'

export interface IGetNotificationsDTO {
  user: string
  offset: number
  limit: number
}

export interface IGetNotificationsResult {
  notifications: Array<INotification>
  metadata: {
    count: number
    offset: number
    limit: number
    total: number
  }
}
