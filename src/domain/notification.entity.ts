export interface INotification {
  recipentId: string
  recipentMail: string
  senderId?: string
  subject: string
  message: string
  severity: number
}
