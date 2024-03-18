import { CreateHolidayService } from "../../../data/services/create-holiday";
import { PgHolidayRepository, PgParticipantRepository } from "../../../infra/repositories/postgres";
import { CreateHolidayController } from "../../../presentation/controllers/create-holiday";
import { Controller } from "../../../presentation/protocols";
import { makeCreateHolidayValidation } from "../validation";

export const makeCreateHolidayController = (): Controller => {
  const holidayRepo = new PgHolidayRepository()
  const participantRepo = new PgParticipantRepository()
  const service = new CreateHolidayService(holidayRepo, participantRepo)
  const validator = makeCreateHolidayValidation()

  return new CreateHolidayController(service, validator)
}
