import { FastifyRequest } from 'fastify'
import { knex } from '../../database'
import z from 'zod'

export const fetchTransaction = async (request: FastifyRequest) => {
  const getTransactionsParamsSchema = z.object({ id: z.string().uuid() })

  const { id } = getTransactionsParamsSchema.parse(request.params)

  const { sessionId } = request.cookies

  const transaction = await knex('transactions')
    .select('public_id', 'title', 'amount', 'created_at')
    .where({
      public_id: id,
      session_id: sessionId,
    })
    .first()

  return { transaction }
}
