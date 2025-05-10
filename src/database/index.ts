import { knex as setup, Knex } from 'knex'

if (!process.env.DATABASE_URL) throw new Error('missing DATABASE URL')

export const config: Knex.Config = {
  client: 'better-sqlite3',
  connection: {
    filename: process.env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}
export const knex = setup(config)
