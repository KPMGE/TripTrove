import { CreateParticipantRepository } from "../../../data/repositories";
import { Participant } from "../../../domain/entities";
import { pool } from './helper'

export class PgParticipantRepository implements CreateParticipantRepository {
  private async insertParticipant(holidayId: number, { name }: Participant) {
    const createdParticipant = await pool.query(`
      INSERT INTO participant (name, holiday_id)
      VALUES($1, $2)
      RETURNING id, name`,
      [name, holidayId]
    )
    return createdParticipant.rows[0]
  }

  async insertAll(holidayId: number, participants: CreateParticipantRepository.Input): Promise<CreateParticipantRepository.Output> {
    console.log('PARTICIPATNS: ', participants)

    const createdParticipants = await Promise.all(
      participants.map(participant => this.insertParticipant(holidayId, participant))
    )

    console.log('Created participants: ', createdParticipants)
    return createdParticipants
  }
}
