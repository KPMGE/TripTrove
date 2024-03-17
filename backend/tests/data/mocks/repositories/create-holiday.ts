import { CreateHolidayRepository } from "../../../../src/data/repositories";
import { makeFakeHoliday } from "../entities";

export class CreateHolidayRepositoryMock implements CreateHolidayRepository {
  async create(holiday: CreateHolidayRepository.Input): Promise<CreateHolidayRepository.Output> {
    return { ...makeFakeHoliday(), id: 1 }
  }
}
