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
import { ITransaction } from '@/interfaces/models/ITransaction'
import { randomUUID } from 'node:crypto'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  private items: ITransaction[] = []

  async findMany(
    params: IGetAllTransactionsUseCaseDTO,
  ): Promise<IGetAllTransactionsUseCaseResponse> {
    const transactions = this.items.filter(
      (value) => value.session_id === params.sessionId,
    )

    return transactions
  }

  async findById(
    params: IFetchTransactionUseCaseDTO,
  ): Promise<IFetchTransactionUseCaseResponse> {
    const transactions = this.items.filter(
      (value) =>
        value.session_id === params.sessionId && value.public_id === params.id,
    )

    return transactions[0]
  }

  async create({
    amount,
    sessionId,
    title,
    type,
  }: ICreateTransactionUseCaseDTO): Promise<void> {
    this.items.push({
      id: this.items.length + 1,
      public_id: randomUUID(),
      created_at: new Date().toDateString(),
      session_id: sessionId,
      amount: type === 'credit' ? amount : amount * -1,
      title,
    })
  }

  async getSummary({
    sessionId,
  }: IGetSummaryUseCaseDTO): Promise<IGetSummaryUseCaseResponse> {
    const summary = this.items
      .filter((value) => value.session_id === sessionId)
      .reduce(
        (acc, curr) => {
          return {
            amount: acc.amount + curr.amount,
          }
        },
        {
          amount: 0,
        },
      )

    return summary
  }
}
