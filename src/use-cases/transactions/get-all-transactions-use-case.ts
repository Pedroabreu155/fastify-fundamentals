import { IUseCase } from '@/interfaces/use-cases/IUseCase'
import {
  IGetAllTransactionsUseCaseDTO,
  IGetAllTransactionsUseCaseResponse,
} from '@/interfaces/dtos'
import { TransactionsRepository } from '@/repositories/transactions-repository'

export class GetAllTransactionsUseCase
  implements
    IUseCase<IGetAllTransactionsUseCaseDTO, IGetAllTransactionsUseCaseResponse>
{
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({ sessionId }: IGetAllTransactionsUseCaseDTO) {
    const transactions = await this.transactionsRepository.findMany({
      sessionId,
    })

    return transactions
  }
}
