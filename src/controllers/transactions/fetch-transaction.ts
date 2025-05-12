import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { FetchTransactionUseCase } from '@/use-cases/transactions/fetch-transaction-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'

export const fetchTransaction = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const getTransactionsParamsSchema = z.object({ id: z.string().uuid() })

  const { id } = getTransactionsParamsSchema.parse(request.params)

  const sessionId = request.cookies.sessionId as string

  try {
    const fetchTransactionUseCase = new FetchTransactionUseCase()

    const transaction = await fetchTransactionUseCase.execute({ id, sessionId })

    return { transaction }
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
