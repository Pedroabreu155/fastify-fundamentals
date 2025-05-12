import { KnexTransactionsRepository } from '@/repositories/knex/knex-transactions-repository'
import { FetchTransactionUseCase } from '../transactions/fetch-transaction-use-case'

export function makeFetchTransactionUseCase() {
  const transactionsRepository = new KnexTransactionsRepository()
  const fetchTransactionUseCase = new FetchTransactionUseCase(
    transactionsRepository,
  )

  return fetchTransactionUseCase
}
