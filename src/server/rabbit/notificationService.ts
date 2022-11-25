import { INotification } from '../../domain/notification.entity'
import { IUser } from '../../domain/user.entity'
import { MongoRepository } from '../repos/mongo.repository'
import { UserRestRepository } from '../repos/rest.repository'

interface IUserRepo {
  getUser(userId: string): Promise<IUser>
}

interface INotificationRepo {
  createNotification(notification: INotification): Promise<INotification>
}

export class NotificationRabbitService {
  private userRepo: IUserRepo
  private notificationRepo: INotificationRepo
  constructor(userRepo: IUserRepo, notificationRepo: INotificationRepo) {
    this.userRepo = userRepo
    this.notificationRepo = notificationRepo
  }
  createNotification = async (notification: INotification): Promise<INotification> => {
    const recipent: IUser = await this.userRepo.getUser(notification.recipentId)
    notification.recipentMail = recipent.mail
    const notificationCreated: INotification = await this.notificationRepo.createNotification(notification)
    return notificationCreated
  }
}

const notificationRepo = new MongoRepository()
const userRepo = new UserRestRepository()
export const notificationRabbitService = new NotificationRabbitService(userRepo, notificationRepo)
