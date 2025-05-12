import { IUseCase } from '@/interfaces/use-cases/IUseCase'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import {
  IFetchTransactionUseCaseDTO,
  IFetchTransactionUseCaseResponse,
} from '@/interfaces/dtos'
import { TransactionsRepository } from '@/repositories/transactions-repository'

export class FetchTransactionUseCase
  implements
    IUseCase<IFetchTransactionUseCaseDTO, IFetchTransactionUseCaseResponse>
{
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({ id, sessionId }: IFetchTransactionUseCaseDTO) {
    const transaction = await this.transactionsRepository.findById({
      sessionId,
      id,
    })

    if (!transaction) {
      throw new ResourceNotFoundError()
    }

    return transaction
  }
}
