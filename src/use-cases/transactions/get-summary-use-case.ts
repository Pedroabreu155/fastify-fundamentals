import {
  IGetSummaryUseCaseDTO,
  IGetSummaryUseCaseResponse,
} from '@/interfaces/dtos'
import { IUseCase } from '@/interfaces/use-cases/IUseCase'
import { TransactionsRepository } from '@/repositories/transactions-repository'

export class GetSummaryUseCase
  implements IUseCase<IGetSummaryUseCaseDTO, IGetSummaryUseCaseResponse>
{
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({ sessionId }: IGetSummaryUseCaseDTO) {
    const summary = await this.transactionsRepository.getSummary({
      sessionId,
    })

    return summary
  }
}
