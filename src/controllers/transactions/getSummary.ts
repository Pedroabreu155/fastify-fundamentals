import { FastifyRequest } from 'fastify'
import { knex } from '../../database'

export const getSummary = async (request: FastifyRequest) => {
  const { sessionId } = request.cookies

  const summary = await knex('transactions')
    .where('session_id', sessionId)
    .sum('amount', { as: 'amount' })
    .first()

  return { summary }
}
