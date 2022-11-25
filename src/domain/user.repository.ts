import { IUser } from './user.entity'

export interface UserRepository {
  getUser(userId: string): Promise<IUser | null>
}
