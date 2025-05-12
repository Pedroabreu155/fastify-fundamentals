import {
  IGetAllTransactionsUseCaseDTO,
  IGetAllTransactionsUseCaseResponse,
  IFetchTransactionUseCaseDTO,
  IFetchTransactionUseCaseResponse,
  ICreateTransactionUseCaseDTO,
  IGetSummaryUseCaseDTO,
  IGetSummaryUseCaseResponse,
} from '@/interfaces/dtos'
import { TransactionsRepository } from '../transactions-repository'
import { knex } from '@/database'

export class KnexTransactionsRepository implements TransactionsRepository {
  async findMany({
    sessionId,
  }: IGetAllTransactionsUseCaseDTO): Promise<IGetAllTransactionsUseCaseResponse> {
    const transactions = await knex('transactions')
      .select('public_id', 'title', 'amount', 'created_at')
      .where({
        session_id: sessionId,
      })

    return transactions
  }
  findById(
    params: IFetchTransactionUseCaseDTO,
  ): Promise<IFetchTransactionUseCaseResponse> {
    throw new Error('Method not implemented.')
  }
  create(params: ICreateTransactionUseCaseDTO): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getSummary(
    params: IGetSummaryUseCaseDTO,
  ): Promise<IGetSummaryUseCaseResponse> {
    throw new Error('Method not implemented.')
  }
}
