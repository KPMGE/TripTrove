import { readFileSync } from 'fs'
import { pool } from '../../infra/repositories/postgres/helper'

export const setupPostgresDb = async () => {
  await pool.connect()
  console.log('database connected!')

  const holidaySql = readFileSync('./src/infra/repositories/postgres/schemas/holiday.sql', 'utf8')
  const participantSql = readFileSync('./src/infra/repositories/postgres/schemas/participant.sql', 'utf8')

  // creates participatn table using the query
  try {
    await pool.query(holidaySql)
    console.log('holiday table created')
  } catch (error) {
    console.error(error.message)
  }

  // creates participant call table using the query
  try {
    await pool.query(participantSql)
    console.log('participant table created!')
  } catch (error) {
    console.error(error.message)
  }
}
