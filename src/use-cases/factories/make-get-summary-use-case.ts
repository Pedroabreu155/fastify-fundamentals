import { KnexTransactionsRepository } from '@/repositories/knex/knex-transactions-repository'
import { GetSummaryUseCase } from '../transactions/get-summary-use-case'

export function makeGetSummaryUseCase() {
  const transactionsRepository = new KnexTransactionsRepository()
  const getSummaryUseCase = new GetSummaryUseCase(transactionsRepository)

  return getSummaryUseCase
}
