import 'dotenv/config'
import crypto from 'node:crypto'

import fastify from 'fastify'
import { knex } from './database'

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

app.listen({ port: 3333 }).then(() => console.log('Server running'))
