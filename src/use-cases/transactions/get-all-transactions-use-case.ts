import { knex } from '@/database'
import { IUseCase } from '@/interfaces/IUseCase'
import { ITransaction } from '@/interfaces/models/ITransaction'

interface IGetAllTransactionsUseCaseDTO {
  sessionId: string
}

type IGetAllTransactionsUseCaseResponse = {
  transactions: Pick<
    ITransaction,
    'public_id' | 'title' | 'amount' | 'created_at'
  >[]
}

export class GetAllTransactionsUseCase
  implements
    IUseCase<IGetAllTransactionsUseCaseDTO, IGetAllTransactionsUseCaseResponse>
{
  async execute({ sessionId }: IGetAllTransactionsUseCaseDTO) {
    const transactions = await knex('transactions')
      .select('public_id', 'title', 'amount', 'created_at')
      .where({
        session_id: sessionId,
      })

    return { transactions }
  }
}
