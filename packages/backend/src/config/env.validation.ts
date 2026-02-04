import { z } from 'zod'

export const envSchema = z.object({
  environment: z.enum(['development', 'production']).default('development'),
  port: z.number().default(3001),
  databaseUrl: z.string(),
  jwtSecret: z.string(),
  databasePort: z.number().default(5432),
})
