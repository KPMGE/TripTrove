import { Holiday, Participant } from "../../domain/entities"
import { CreateHolidayUseCase } from "../../domain/use-cases"
import { CreateHolidayRepository, CreateParticipantRepository } from "../repositories"

export class CreateHolidayService implements CreateHolidayUseCase {
  constructor(
    private readonly holidayRepo: CreateHolidayRepository,
    private readonly participantRepo: CreateParticipantRepository
  ) { }

  async execute(holiday: CreateHolidayService.Input): Promise<CreateHolidayService.Output> {
    const createdHoliday = await this.holidayRepo.create({
      title: holiday.title,
      description: holiday.description,
      date: holiday.date,
      location: holiday.location
    })

    const createdParticipants = await this.participantRepo.insertAll(createdHoliday.id, holiday.participants)

    return {
      ...createdHoliday,
      participants: createdParticipants
    }
  }
}

export namespace CreateHolidayService {
  export type Input = Omit<Holiday, 'id'> & { participants: Participant[] }
  export type Output = Holiday & { id: number, participants: Participant[] }
}
