import { FastifyRequest } from 'fastify'
import { GetSummaryUseCase } from '@/use-cases/transactions/get-summary-use-case'

export const getSummary = async (request: FastifyRequest) => {
  const sessionId = request.cookies.sessionId as string

  const getSummaryUseCase = new GetSummaryUseCase()
  const summary = await getSummaryUseCase.execute({ sessionId })

  return { summary }
}
