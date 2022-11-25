import mongoose, { Schema, model } from 'mongoose'

const NotificationSchema = new Schema(
  {
    to: {
      type: String
    },
    subject: {
      type: String
    },
    message: {
      type: String
    },
    recipentId: {
      type: String
    },
    senderId: {
      type: String
    },
    recipentMail: {
      type: String
    },
    severity: {
      type: Number
    },
    readed: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const notificationRepo = mongoose.connection.useDb('notifications')

const NotificationModel = notificationRepo.model('notifications', NotificationSchema)

export default NotificationModel
