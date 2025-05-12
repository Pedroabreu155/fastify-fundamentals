import { FastifyInstance } from 'fastify'
import { getAll } from './get-all-transactions'
import { fetchTransaction } from './fetch-transaction'
import { createTransaction } from './create-transaction'
import { getSummary } from './get-summary'
import { checkSessionId } from '../../middlewares/check-session-id'

export async function transactionsControllerRoutes(app: FastifyInstance) {
  app.get('/', { onRequest: checkSessionId }, getAll)
  app.get('/:id', { onRequest: checkSessionId }, fetchTransaction)
  app.get('/summary', { onRequest: checkSessionId }, getSummary)

  app.post('/', createTransaction)
}
