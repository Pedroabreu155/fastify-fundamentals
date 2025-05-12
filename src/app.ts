import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'

import { transactionsControllerRoutes } from './controllers/transactions/routes'
import { env } from './env'

export const app = fastify()

app.register(fastifyCookie)
app.register(transactionsControllerRoutes, { prefix: 'transactions' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
