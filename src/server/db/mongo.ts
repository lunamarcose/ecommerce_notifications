import { connect } from 'mongoose'
import { mongoConfig } from '../config'

const DB_URI = `${mongoConfig.mongoURL}`

const dbInit = async () => {
  await connect(DB_URI)
  console.log('Connected to mongoDB')
}

export default dbInit
