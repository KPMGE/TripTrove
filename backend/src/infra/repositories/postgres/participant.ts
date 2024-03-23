import { CreateParticipantRepository, DeleteParticipantRepository, GetParticipantsRepository } from "../../../data/repositories";
import { Participant } from "../../../domain/entities";
import { pool } from './helper'

export class PgParticipantRepository 
implements 
  CreateParticipantRepository,
  GetParticipantsRepository,
  DeleteParticipantRepository
{
  private async insertParticipant(holidayId: number, { name }: Participant) {
    const createdParticipant = await pool.query(`
      INSERT INTO participant (name, holiday_id)
      VALUES($1, $2)
      RETURNING id, name`,
      [name, holidayId]
    )
    return createdParticipant.rows[0]
  }

  async insertAll(holidayId: number, participants: Participant[]): Promise<Participant[]> {
    console.log()

    const createdParticipants = await Promise.all(
      participants.map(participant => this.insertParticipant(holidayId, participant))
    )

    return createdParticipants
  }

  async getByHolidayId(holidayId: number): Promise<Participant[]> {
    const participantsDb = await pool.query(`
      SELECT name, id
      FROM participant 
      WHERE holiday_id = $1
    `,
      [holidayId]
    )
    return participantsDb.rows
  }

  async deleteAllByHolidayId(holidayId: number): Promise<void> {
    await pool.query(`DELETE FROM participant WHERE holiday_id = $1`, [holidayId])
  }
}
