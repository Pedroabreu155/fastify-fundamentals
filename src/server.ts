import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'

import { env } from './env'
import { transactionsControllerRoutes } from './controllers/transactions/routes'

const app = fastify()

app.register(fastifyCookie)
app.register(transactionsControllerRoutes, { prefix: 'transactions' })

app
  .listen({ port: Number(env.PORT) })
  .then(() => console.log(`Server running on port ${Number(env.PORT)}`))
