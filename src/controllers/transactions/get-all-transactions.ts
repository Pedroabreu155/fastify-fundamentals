import { FastifyRequest } from 'fastify'
import { GetAllTransactionsUseCase } from '@/use-cases/transactions/get-all-transactions-use-case'

export const getAll = async (request: FastifyRequest) => {
  const sessionId = request.cookies.sessionId as string

  const getAllTransactionsUseCase = new GetAllTransactionsUseCase()

  const transactions = await getAllTransactionsUseCase.execute({ sessionId })

  return transactions
}
