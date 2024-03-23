import { Participant } from "../../domain/entities"

export interface CreateParticipantRepository {
  insertAll(holidayId: number, participants: Participant[]): Promise<Participant[]>
}
