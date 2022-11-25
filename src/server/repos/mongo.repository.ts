import { IGetNotificationsResult } from '../../app/getAllNotifications/getAllNotifications.dto'
import { IGetUnreadNotificationsResult } from '../../app/getUnreadNotifications/getUnreadNotifications.dto'
import { INotification } from '../../domain/notification.entity'
import { NotificationRepository } from '../../domain/notification.repository'
import NotificationModel from '../models/notification.schema'
import { SMTPService } from '../smtp/notificationService'

export class MongoRepository implements NotificationRepository {
  async createNotification(notification: INotification): Promise<INotification> {
    // Aca puedo hacer uso de mongo o cualquier otra cosa de infra
    const notificationCreated = await NotificationModel.create(notification)
    const mail = notification?.recipentMail
    if (notification.severity > 0) {
      await SMTPService.sendNotification({ subject: notification.subject, text: notification.message, to: mail })
    }
    return notificationCreated as INotification
  }

  async getNotifications(user: string, offset: number, limit: number): Promise<IGetNotificationsResult> {
    const totalNotifications = await NotificationModel.find({ recipentId: user }).count()
    const notifications = await NotificationModel.find({ recipentId: user }).skip(offset).limit(limit)
    return {
      notifications: notifications.map((notification) => {
        return {
          id: notification.id,
          subject: notification.subject?.slice(0, 10),
          message: notification.message?.slice(0, 50),
          recipentId: notification.recipentId,
          recipentMail: notification.recipentMail,
          senderId: notification.senderId,
          severity: notification.severity,
          readed: notification.readed
        }
      }),
      metadata: {
        count: notifications.length,
        offset: offset,
        limit: limit,
        total: totalNotifications
      }
    } as IGetNotificationsResult
  }

  async getUnreadNotifications(user: string, offset: number, limit: number): Promise<IGetUnreadNotificationsResult> {
    const totalNotifications = await NotificationModel.find({ recipentId: user, readed: { $exists: false } }).count()
    const notifications = await NotificationModel.find({ recipentId: user, readed: { $exists: false } })
      .skip(offset)
      .limit(limit)
    return {
      notifications: notifications.map((notification) => {
        return {
          id: notification.id,
          subject: notification.subject?.slice(0, 10),
          message: notification.message?.slice(0, 50),
          recipentId: notification.recipentId,
          recipentMail: notification.recipentMail,
          senderId: notification.senderId,
          severity: notification.severity,
          readed: notification.readed
        }
      }),
      metadata: {
        count: notifications.length,
        offset: offset,
        limit: limit,
        total: totalNotifications
      }
    } as IGetUnreadNotificationsResult
  }

  async getNotification(notificationId: string): Promise<INotification | null> {
    const notification = await NotificationModel.findById(notificationId)
    if (!notification) return null
    return {
      id: notification.id,
      subject: notification.subject,
      message: notification.message,
      recipentId: notification.recipentId,
      recipentMail: notification.recipentMail,
      senderId: notification.senderId,
      severity: notification.severity,
      readed: notification.readed
    } as INotification
  }

  async readNotification(notificationId: string): Promise<INotification> {
    const notification = await NotificationModel.findOneAndUpdate(
      { _id: notificationId },
      { readed: new Date() },
      { new: true }
    )
    return {
      id: notification?.id,
      subject: notification?.subject,
      message: notification?.message,
      recipentId: notification?.recipentId,
      recipentMail: notification?.recipentMail,
      senderId: notification?.senderId,
      severity: notification?.severity,
      readed: notification?.readed!.toString()
    } as INotification
  }
}
