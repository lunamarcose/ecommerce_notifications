export interface ICreateNotificationDTO {
  recipent: string
  sender?: string
  subject: string
  message: string
  severity: number
}
