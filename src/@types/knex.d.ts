/* eslint-disable-next-line */
import { Knex } from 'knex'
import { ITransaction } from '../interfaces/models/ITransaction'

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: ITransaction
  }
}
