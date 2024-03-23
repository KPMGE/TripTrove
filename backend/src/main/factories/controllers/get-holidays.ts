import { GetHolidaysService } from "../../../data/services"
import { PgHolidayRepository, PgParticipantRepository } from "../../../infra/repositories/postgres"
import { GetHolidaysController } from "../../../presentation/controllers"
import { Controller } from "../../../presentation/protocols"

export const makeGetHolidaysController = (): Controller => {
  const holidayRepo = new PgHolidayRepository()
  const participantRepo = new PgParticipantRepository()
  const service = new GetHolidaysService(holidayRepo, participantRepo)

  return new GetHolidaysController(service)
}
