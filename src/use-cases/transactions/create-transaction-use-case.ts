import { randomUUID } from 'node:crypto'
import { IUseCase } from '../../interfaces/use-cases/IUseCase'
import { knex } from '../../database'
import { ICreateTransactionUseCaseDTO } from '@/interfaces/dtos'

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
