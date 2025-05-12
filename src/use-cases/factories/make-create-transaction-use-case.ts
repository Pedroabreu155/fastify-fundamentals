import { KnexTransactionsRepository } from '@/repositories/knex/knex-transactions-repository'
import { CreateTransactionUseCase } from '../transactions/create-transaction-use-case'

export function makeCreateTransactionUseCase() {
  const transactionsRepository = new KnexTransactionsRepository()
  const createTransactionUseCase = new CreateTransactionUseCase(
    transactionsRepository,
  )

  return createTransactionUseCase
}
