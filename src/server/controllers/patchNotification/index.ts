import { ReadNotificationUseCase } from '../../../app/readNotification/readNotificationUseCase'
import { MongoRepository } from '../../repos/mongo.repository'
import { PatchNotificationController } from './patchNotification.ctrl'

const mongoRepository = new MongoRepository()
const readNotificationUseCase = new ReadNotificationUseCase(mongoRepository)
const patchNotificationController = new PatchNotificationController(readNotificationUseCase)

export { patchNotificationController }
