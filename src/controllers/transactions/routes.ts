import { FastifyInstance } from 'fastify'
import { getAll } from './getAllTransactions'
import { fetchTransaction } from './fetchTransaction'
import { createTransaction } from './createTransaction'
import { getSummary } from './getSummary'
import { checkSessionId } from '../../middlewares/check-session-id'

export async function transactionsControllerRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: checkSessionId }, getAll)
  app.get('/:id', { preHandler: checkSessionId }, fetchTransaction)
  app.get('/summary', { preHandler: checkSessionId }, getSummary)

  app.post('/', createTransaction)
}
