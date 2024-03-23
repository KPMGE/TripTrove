import { Holiday, Participant } from "../../domain/entities"
import { GetHolidaysUseCase } from "../../domain/use-cases"
import { GetHolidaysRepository, GetParticipantsRepository } from "../repositories"

export class GetHolidaysService implements GetHolidaysUseCase {
  constructor(
    private readonly holidayRepo: GetHolidaysRepository,
    private readonly participantRepo: GetParticipantsRepository
  ) { }

  async execute(holidayId?: number): Promise<GetHolidaysService.Output> {
    if (holidayId) {
      const participants = await this.participantRepo.getByHolidayId(holidayId)
      const holiday = await this.holidayRepo.getById(holidayId)
      return {
        ...holiday,
        participants
      }
    }

    const allHolidays = await this.holidayRepo.getAll()
    const promises = allHolidays.map(async holiday => ({
      ...holiday,
      participants: await this.participantRepo.getByHolidayId(holiday.id)
    }))

    return Promise.all(promises)
  }
}

export namespace GetHolidaysService {
  type HolidayWithParticipants = (Holiday & { participants: Participant[] })
  export type Output = HolidayWithParticipants[] | HolidayWithParticipants
}
