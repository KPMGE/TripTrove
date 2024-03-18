import { Holiday } from "../../../src/domain/entities";
import { CreateHolidayUseCase } from "../../../src/domain/use-cases";
import { makeFakeHoliday } from "../../data/mocks/entities";

export class CreateHolidayServiceMock implements CreateHolidayUseCase {
  async execute(holiday: Holiday): Promise<Holiday> {
    return makeFakeHoliday()
  }
}
