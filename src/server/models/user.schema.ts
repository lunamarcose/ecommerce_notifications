import mongoose, { Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
  name: string
  login: string
  mail: string
}

const UserSchema = new Schema({
  name: {
    type: String
  },
  login: {
    type: String
  },
  mail: {
    type: String
  }
})

const userRepo = mongoose.connection.useDb('auth2')

const UserModel = userRepo.model<IUser>('users', UserSchema)

export default UserModel
