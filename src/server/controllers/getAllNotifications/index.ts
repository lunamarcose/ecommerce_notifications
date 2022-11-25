import { GetNotificationsUseCase } from '../../../app/getAllNotifications/getAllNotificationsUseCase'
import { MongoRepository } from '../../repos/mongo.repository'
import { GetAllNotificationsController } from './getAllNotifications.ctrl'

const mongoRepository = new MongoRepository()
const getNotificationsUseCase = new GetNotificationsUseCase(mongoRepository)
const getAllNotificationsController = new GetAllNotificationsController(getNotificationsUseCase)

export { getAllNotificationsController }
