import { randomUUID } from 'node:crypto'

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
  async create({
    amount,
    sessionId,
    title,
    type,
  }: ICreateTransactionUseCaseDTO): Promise<void> {
    await knex('transactions').insert({
      public_id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })
  }
  getSummary(
    params: IGetSummaryUseCaseDTO,
  ): Promise<IGetSummaryUseCaseResponse> {
    throw new Error('Method not implemented.')
  }
}
