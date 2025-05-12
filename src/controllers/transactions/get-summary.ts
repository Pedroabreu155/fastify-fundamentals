import { FastifyRequest } from 'fastify'
import { makeGetSummaryUseCase } from '@/use-cases/factories/make-get-summary-use-case'

export const getSummary = async (request: FastifyRequest) => {
  const sessionId = request.cookies.sessionId as string

  const getSummaryUseCase = makeGetSummaryUseCase()
  const summary = await getSummaryUseCase.execute({ sessionId })

  return { summary }
}
