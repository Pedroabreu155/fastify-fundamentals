import 'dotenv/config'

import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string().default('3333'),
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('prod'),
})
const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalida env variables', parsed.error.format())

  throw new Error(`Invalid env`)
}

export const env = parsed.data
