import { FastifyRequest } from 'fastify'
import { makeGetAllTransactionsUseCase } from '@/use-cases/factories/make-get-all-transactions-use-case'

export const getAll = async (request: FastifyRequest) => {
  const sessionId = request.cookies.sessionId as string

  const getAllUseCase = makeGetAllTransactionsUseCase()

  const transactions = await getAllUseCase.execute({ sessionId })

  return { transactions }
}
