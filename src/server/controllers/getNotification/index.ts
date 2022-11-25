import { GetNotificationUseCase } from '../../../app/getNotification/getNotificationUseCase'
import { MongoRepository } from '../../repos/mongo.repository'
import { GetNotificationController } from './getNotification.ctrl'

const mongoRepository = new MongoRepository()
const getNotificationUseCase = new GetNotificationUseCase(mongoRepository)
const getNotificationController = new GetNotificationController(getNotificationUseCase)

export { getNotificationController }
