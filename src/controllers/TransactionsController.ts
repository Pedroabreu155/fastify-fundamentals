import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import z from 'zod'

export async function transactionsController(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select(
      'public_id',
      'title',
      'amount',
      'created_at',
    )

    return { transactions }
  })

  app.get('/:id', async (request) => {
    const getTransactionsParamsSchema = z.object({ id: z.string().uuid() })
    const { id } = getTransactionsParamsSchema.parse(request.params)

    const transaction = await knex('transactions')
      .select('public_id', 'title', 'amount', 'created_at')
      .where('public_id', id)
      .first()

    return { transaction }
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    await knex('transactions')
      .insert({
        public_id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
      })
      .returning('*')

    return reply.status(201).send()
  })
}
