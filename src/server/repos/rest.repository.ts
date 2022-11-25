import { IUser } from '../../domain/user.entity'
import { UserRepository } from '../../domain/user.repository'
import { HttpClient } from '../http/httpClient'

export class UserRestRepository implements UserRepository {
  private hostUrl = 'http://127.0.0.1:3000'
  private endpoint = 'v1/users'
  private method = 'getMail'
  private httpClient = new HttpClient()
  async getUser(userId: string): Promise<IUser> {
    const user = await this.httpClient.get(`${this.hostUrl}/${this.endpoint}/${userId}/${this.method}`)
    return user.data as IUser
  }
}
