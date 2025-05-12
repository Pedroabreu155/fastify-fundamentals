import { knex } from '@/database'
import {
  IGetSummaryUseCaseDTO,
  IGetSummaryUseCaseResponse,
} from '@/interfaces/dtos'
import { IUseCase } from '@/interfaces/use-cases/IUseCase'

export class GetSummaryUseCase
  implements IUseCase<IGetSummaryUseCaseDTO, IGetSummaryUseCaseResponse>
{
  async execute({ sessionId }: IGetSummaryUseCaseDTO) {
    const summary = await knex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()

    console.log(summary)

    return summary
  }
}
