import { randomUUID } from 'node:crypto'
import { IUseCase } from '../../interfaces/IUseCase'
import { knex } from '../../database'

interface ICreateTransactionUseCaseDTO {
  title: string
  amount: number
  type: 'credit' | 'debit'
  sessionId: string
}

export class CreateTransactionUseCase
  implements IUseCase<ICreateTransactionUseCaseDTO, void>
{
  async execute({
    amount,
    title,
    type,
    sessionId,
  }: ICreateTransactionUseCaseDTO) {
    await knex('transactions').insert({
      public_id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })
  }
}
