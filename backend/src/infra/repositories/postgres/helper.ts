import { Pool } from 'pg'
import { env } from '../../../main/config/env'

export const pool = new Pool({
  user: env.postgresUser,
  host: env.postgresHost,
  database: env.postgresDatabase,
  password: env.postgresPassword,
  port: Number(env.postgresPort),
})
