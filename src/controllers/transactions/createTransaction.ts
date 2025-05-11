import { randomUUID } from 'node:crypto'

import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { knex } from '../../database'

export const createTransaction = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
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
}
