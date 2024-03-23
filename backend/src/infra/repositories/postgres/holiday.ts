import { CreateHolidayRepository, GetHolidaysRepository } from "../../../data/repositories";
import { Holiday } from "../../../domain/entities";
import { pool } from './helper'

export class PgHolidayRepository implements CreateHolidayRepository, GetHolidaysRepository {
  async create({ title, description, date, location }: CreateHolidayRepository.Input): Promise<CreateHolidayRepository.Output> {
    const holidayDb = await pool.query(
      `INSERT INTO holiday (title, description, date, location)
       VALUES($1, $2, $3, $4)
       RETURNING id, title, description, date, location`,
      [title, description, date, location]
    )

    const createdHoliday = holidayDb.rows[0]
    return createdHoliday
  }

  async getAll(): Promise<Holiday[]> {
    const holidaysDb = await pool.query(`SELECT id, title, description, date, location FROM holiday`)
    return holidaysDb.rows
  }

  async getById(holidayId: number): Promise<Holiday> {
    const holidaysDb = await pool.query(`
      SELECT id, title, description, date, location FROM holiday WHERE id = $1
    `,
      [holidayId]
    )
    return holidaysDb.rows[0]
  }
}
