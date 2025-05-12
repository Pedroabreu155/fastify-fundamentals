import { IUseCase } from '../../interfaces/use-cases/IUseCase'
import { ICreateTransactionUseCaseDTO } from '@/interfaces/dtos'
import { TransactionsRepository } from '@/repositories/transactions-repository'

export class CreateTransactionUseCase
  implements IUseCase<ICreateTransactionUseCaseDTO, void>
{
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    amount,
    title,
    type,
    sessionId,
  }: ICreateTransactionUseCaseDTO) {
    await this.transactionsRepository.create({
      amount,
      sessionId,
      title,
      type,
    })
  }
}
