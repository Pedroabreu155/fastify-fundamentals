import { randomUUID } from 'node:crypto'

import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { knex } from '../../database'

export const createTransaction = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  let { sessionId } = request.cookies

  if (!sessionId) {
    sessionId = randomUUID()

    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 ano
    })
  }

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
      session_id: sessionId,
    })
    .returning('*')

  return reply.status(201).send()
}
