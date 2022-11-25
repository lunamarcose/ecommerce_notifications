import { GetUnreadNotificationsUseCase } from '../../../app/getUnreadNotifications/getUnreadNotificationsUseCase'
import { MongoRepository } from '../../repos/mongo.repository'
import { GetUnreadNotificationsController } from './getUnreadNotifications.ctrl'

const mongoRepository = new MongoRepository()
const getUnreadNotificationsUseCase = new GetUnreadNotificationsUseCase(mongoRepository)
const getUnreadNotificationsController = new GetUnreadNotificationsController(getUnreadNotificationsUseCase)

export { getUnreadNotificationsController }
