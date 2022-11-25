import * as amqp from 'amqplib'
import { INotification } from '../../domain/notification.entity'
import { rabbitConfig } from '../config'
import { notificationRabbitService } from './notificationService'

export class RabbitWorkQueue {
  private queue: string

  constructor(queue: string) {
    this.queue = queue
  }

  init = async () => {
    try {
      const conn = await amqp.connect(rabbitConfig().url)
      const channel = await conn.createChannel()
      channel.on('close', () => {
        console.error('RabbitMQ conexión cerrada, intentado reconectar en 10')
        setTimeout(() => this.init(), 10000)
      })
      console.log('RabbitMQ conectado al queue: ' + this.queue)
      channel.assertQueue(this.queue, { durable: true })
      channel.prefetch(1)
      channel.consume(
        this.queue,
        (message) => {
          console.log('Mensaje recibido')
          const messageParsed = JSON.parse(message!.content.toString()) as INotification
          notificationRabbitService.createNotification(messageParsed)
          channel.ack(message!)
        },
        {
          noAck: false
        }
      )
    } catch (error: any) {
      console.error('RabbitMQ Error: ' + error.message)
      setTimeout(() => this.init(), 10000)
    }
  }
}

export const rabbitWQ = new RabbitWorkQueue(rabbitConfig().queue)
