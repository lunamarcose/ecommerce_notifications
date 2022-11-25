import { INotification } from './notification.entity'

export class NotificationValue implements INotification {
  recipentId: string
  recipentMail: string
  senderId?: string
  subject: string
  message: string
  severity: number

  constructor(userId: string, recipentMail: string, subject: string, message: string, severity: number, senderId?: string) {
    this.recipentId = userId,
    this.recipentMail = recipentMail
    this.subject = subject,
    this.message = message,
    this.severity = severity
    this.senderId = senderId
  }
}
