import { ITransaction } from '../models/ITransaction'

export interface IGetAllTransactionsUseCaseDTO {
  sessionId: string
}

export type IGetAllTransactionsUseCaseResponse = Pick<
  ITransaction,
  'public_id' | 'title' | 'amount' | 'created_at'
>[]

export interface IFetchTransactionUseCaseDTO {
  id: string
  sessionId: string
}

export type IFetchTransactionUseCaseResponse =
  | Pick<ITransaction, 'public_id' | 'title' | 'amount' | 'created_at'>
  | undefined

export interface ICreateTransactionUseCaseDTO {
  title: string
  amount: number
  type: 'credit' | 'debit'
  sessionId: string
}

export interface IGetSummaryUseCaseDTO {
  sessionId: string
}

export type IGetSummaryUseCaseResponse = { amount: number } | undefined
