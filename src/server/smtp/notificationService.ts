import { MailService } from '@sendgrid/mail'
import { notificationsConfig } from '../config'

class SMTPServiceSingleton {
  private mailService: MailService
  constructor() {
    this.mailService = new MailService()
    this.mailService.setApiKey(notificationsConfig().sendgridApiKey)
  }
  async sendNotification(message: IMessage): Promise<any> {
    this.mailService.send({
      to: message.to,
      from: notificationsConfig().from,
      subject: message.subject,
      html: `<h1>${message.text}</h1>`
    })
  }
}

interface IMessage {
  subject: string
  text: string
  to: string
}

export const SMTPService = new SMTPServiceSingleton()
