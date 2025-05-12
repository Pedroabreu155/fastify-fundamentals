import { KnexTransactionsRepository } from '@/repositories/knex/knex-transactions-repository'
import { GetAllTransactionsUseCase } from '../transactions/get-all-transactions-use-case'

export function makeGetAllTransactionsUseCase() {
  const transactionsRepository = new KnexTransactionsRepository()
  const getAllTransactionsUseCase = new GetAllTransactionsUseCase(
    transactionsRepository,
  )

  return getAllTransactionsUseCase
}
