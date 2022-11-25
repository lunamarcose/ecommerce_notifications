import { fastify } from 'fastify'
import { fastifyConfig } from './config'
import dbInit from './db/mongo'
import { router } from './routes/routes'
import autoload from '@fastify/autoload'
import path from 'path'
import { rabbitWQ } from './rabbit/rabbitWorkQueue'

const bootstrap = async (): Promise<any> => {
  const app = fastify(fastifyConfig)
  const PORT = Number(process.env.PORT) || 5000
  app.register(autoload, {
    dir: path.join(__dirname, 'plugins')
  })
  await app.register(router)
  app.listen({ port: PORT }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
  dbInit().then()
  rabbitWQ.init()
  console.log(app.printRoutes())
}
bootstrap()
