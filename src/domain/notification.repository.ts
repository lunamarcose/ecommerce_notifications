import { INotification } from './notification.entity'

export interface NotificationRepository {
  createNotification(notification: INotification): Promise<INotification | null>
  getNotifications(
    user: string,
    offset: number,
    limit: number
  ): Promise<{
    notifications: Array<INotification>
    metadata: { offset: number; count: number; limit: number; total: number }
  } | null>
  getUnreadNotifications(
    user: string,
    offset: number,
    limit: number
  ): Promise<{
    notifications: Array<INotification>
    metadata: { offset: number; count: number; limit: number; total: number }
  } | null>
  getNotification(notificationId: string): Promise<INotification | null>
  readNotification(notificationId: string): Promise<INotification | null>
}
