import {
  ICreateTransactionUseCaseDTO,
  IFetchTransactionUseCaseDTO,
  IFetchTransactionUseCaseResponse,
  IGetAllTransactionsUseCaseDTO,
  IGetAllTransactionsUseCaseResponse,
  IGetSummaryUseCaseDTO,
  IGetSummaryUseCaseResponse,
} from '@/interfaces/dtos'

export interface TransactionsRepository {
  findMany(
    params: IGetAllTransactionsUseCaseDTO,
  ): Promise<IGetAllTransactionsUseCaseResponse>
  findById(
    params: IFetchTransactionUseCaseDTO,
  ): Promise<IFetchTransactionUseCaseResponse>
  create(params: ICreateTransactionUseCaseDTO): Promise<void>
  getSummary(params: IGetSummaryUseCaseDTO): Promise<IGetSummaryUseCaseResponse>
}
