import { Participant } from "../../domain/entities"

export interface CreateParticipantRepository {
  insertAll(holidayId: number, participants: CreateParticipantRepository.Input): Promise<CreateParticipantRepository.Output>
}
export namespace CreateParticipantRepository {
  export type Input = Participant[]
  export type Output = (Participant & { id: number })[]
}
