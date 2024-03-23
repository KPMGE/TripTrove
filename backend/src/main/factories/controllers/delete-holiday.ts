import { DeleteHolidayService } from "../../../data/services";
import { PgHolidayRepository, PgParticipantRepository } from "../../../infra/repositories/postgres";
import { DeleteHolidayController } from "../../../presentation/controllers";
import { Controller } from "../../../presentation/protocols";
import { makeDeleteHolidayValidator } from "../validation";

export const makeDeleteHolidayController = (): Controller => {
  const validator = makeDeleteHolidayValidator()
  const holidayRepo = new PgHolidayRepository()
  const participantRepo = new PgParticipantRepository()
  const service = new DeleteHolidayService(holidayRepo, participantRepo)
  return new DeleteHolidayController(validator, service)
}
