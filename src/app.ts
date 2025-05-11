import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'

import { transactionsControllerRoutes } from './controllers/transactions/routes'

export const app = fastify()

app.register(fastifyCookie)
app.register(transactionsControllerRoutes, { prefix: 'transactions' })
