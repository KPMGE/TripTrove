import { DeleteHolidayUseCase } from "../../domain/use-cases/delete-holiday";
import { DeleteHolidayRepository, DeleteParticipantRepository } from "../repositories";

export class DeleteHolidayService implements DeleteHolidayUseCase {
  constructor(
    private readonly holidayRepo: DeleteHolidayRepository ,
    private readonly participantRepo: DeleteParticipantRepository
  ) {}

  async execute(holidayId: number): Promise<void> {
    await this.participantRepo.deleteAllByHolidayId(holidayId)
    await this.holidayRepo.delete(holidayId)
  }
}
