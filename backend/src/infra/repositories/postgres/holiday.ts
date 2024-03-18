import { CreateHolidayRepository } from "../../../data/repositories";
import { pool } from './helper'

export class PgHolidayRepository implements CreateHolidayRepository {
  async create({ title, description, date, location }: CreateHolidayRepository.Input): Promise<CreateHolidayRepository.Output> {
    const holidayDb = await pool.query(
      `INSERT INTO holiday (title, description, date, location)
       VALUES($1, $2, $3, $4)
       RETURNING id, title, description, date, location`,
      [title, description, date, location]
    )

    const createdHoliday = holidayDb.rows[0]
    console.log('CREATED HOLIDAY: ', createdHoliday)
    return createdHoliday
  }
}
