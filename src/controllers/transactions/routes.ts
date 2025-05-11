import { FastifyInstance } from 'fastify'
import { getAll } from './getAllTransactions'
import { fetchTransaction } from './fetchTransaction'
import { createTransaction } from './createTransaction'

export async function transactionsControllerRoutes(app: FastifyInstance) {
  app.get('/', getAll)
  app.get('/:id', fetchTransaction)

  app.post('/', createTransaction)
}
