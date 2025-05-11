import { FastifyRequest } from 'fastify'
import { knex } from '../../database'

export const getAll = async (request: FastifyRequest) => {
  const { sessionId } = request.cookies

  const transactions = await knex('transactions')
    .select('public_id', 'title', 'amount', 'created_at')
    .where({
      session_id: sessionId,
    })

  return { transactions }
}
