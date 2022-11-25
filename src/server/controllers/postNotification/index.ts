import { CreateNotificationUseCase } from '../../../app/createNotification/createNotificationUseCase'
import { MongoRepository } from '../../repos/mongo.repository'
import { UserRestRepository } from '../../repos/rest.repository'
import { PostNotificationController } from './postNotification.ctrl'

const mongoRepository = new MongoRepository()
const userRepository = new UserRestRepository()
const createNtificationUseCase = new CreateNotificationUseCase(mongoRepository, userRepository)
const postNotificationController = new PostNotificationController(createNtificationUseCase)

export { postNotificationController }
