import { CreateParticipantRepository } from "../../../../src/data/repositories";
import { Participant } from "../../../../src/domain/entities";

export class CreateParticipantRepositoryMock implements CreateParticipantRepository {
  async insertAll(holidayId: number, participants: Participant[]): Promise<Participant[]> {
    return []
  }
}
