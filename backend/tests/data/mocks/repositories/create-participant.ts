import { CreateParticipantRepository } from "../../../../src/data/repositories";

export class CreateParticipantRepositoryMock implements CreateParticipantRepository {
  async insertAll(holidayId: number, participants: CreateParticipantRepository.Input): Promise<CreateParticipantRepository.Output> {
    return []
  }
}
