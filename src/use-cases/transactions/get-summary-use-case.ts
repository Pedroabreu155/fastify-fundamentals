import { knex } from '@/database'
import { IUseCase } from '@/interfaces/IUseCase'

interface IGetSummaryUseCaseDTO {
  sessionId: string
}

type IGetSummaryUseCaseResponse = { amount: number } | undefined

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
