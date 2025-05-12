import { knex } from '@/database'
import { IUseCase } from '@/interfaces/use-cases/IUseCase'
import { ResourceNotFoundError } from '../errors/resource-not-found'
import {
  IFetchTransactionUseCaseDTO,
  IFetchTransactionUseCaseResponse,
} from '@/interfaces/dtos'

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
