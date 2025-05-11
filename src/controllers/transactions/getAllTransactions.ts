import { knex } from '../../database'

export const getAll = async () => {
  const transactions = await knex('transactions').select(
    'public_id',
    'title',
    'amount',
    'created_at',
  )

  return { transactions }
}
