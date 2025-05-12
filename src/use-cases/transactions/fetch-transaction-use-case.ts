import { knex } from '@/database'
import { IUseCase } from '@/interfaces/IUseCase'
import { ITransaction } from '@/interfaces/models/ITransaction'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface IFetchTransactionUseCaseDTO {
  id: string
  sessionId: string
}

type IFetchTransactionUseCaseResponse =
  | Pick<ITransaction, 'public_id' | 'title' | 'amount' | 'created_at'>
  | undefined

export class FetchTransactionUseCase
  implements
    IUseCase<IFetchTransactionUseCaseDTO, IFetchTransactionUseCaseResponse>
{
  async execute({ id, sessionId }: IFetchTransactionUseCaseDTO) {
    const transaction = await knex('transactions')
      .select('public_id', 'title', 'amount', 'created_at')
      .where({
        public_id: id,
        session_id: sessionId,
      })
      .first()

    if (!transaction) {
      throw new ResourceNotFoundError()
    }

    return transaction
  }
}
