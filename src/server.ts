import fastify from 'fastify'
import { env } from './env'
import { transactionsController } from './controllers/TransactionsController'

const app = fastify()

app.register(transactionsController, { prefix: 'transactions' })

app
  .listen({ port: Number(env.PORT) })
  .then(() => console.log(`Server running on port ${Number(env.PORT)}`))
