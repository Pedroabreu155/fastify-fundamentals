import crypto from 'node:crypto'

import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/', async () => {
  const transaction = await knex('transactions')
    .insert({
      public_id: crypto.randomUUID(),
      title: 'Transaction test',
      amount: 10,
    })
    .returning('*')

  return transaction
})

app
  .listen({ port: Number(env.PORT) })
  .then(() => console.log(`Server running on port ${Number(env.PORT)}`))
