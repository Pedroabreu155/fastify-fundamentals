/* eslint-disable-next-line */
import { Knex } from 'knex'
import { Transactions } from '../interfaces/models/transactions'

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: Transactions
  }
}
