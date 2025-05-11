import { execSync } from 'node:child_process'

import { afterAll, beforeAll, describe, expect, beforeEach, it } from 'vitest'
import request from 'supertest'
import { app } from '../../src/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Transação teste',
        amount: 10,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Transação teste',
        amount: 10,
        type: 'credit',
      })

    const cookies = createResponse.get('Set-Cookie') ?? []

    const listResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    expect(listResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Transação teste',
        amount: 10,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const createResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Transação teste',
        amount: 10,
        type: 'credit',
      })

    const cookies = createResponse.get('Set-Cookie') ?? []

    const listResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    const id = listResponse.body.transactions[0].public_id

    const fetchResponse = await request(app.server)
      .get(`/transactions/${id}`)
      .set('Cookie', cookies)

    expect(fetchResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'Transação teste',
        amount: 10,
      }),
    )
  })

  it('should be able to get transactions summary', async () => {
    const createResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Transação teste',
        amount: 10,
        type: 'credit',
      })

    const cookies = createResponse.get('Set-Cookie') ?? []

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Transação teste',
        amount: 5,
        type: 'debit',
      })

    const sumResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)

    expect(sumResponse.body.summary).toEqual(
      expect.objectContaining({
        amount: 5,
      }),
    )
  })
})
