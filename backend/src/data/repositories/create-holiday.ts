import { Holiday } from "../../domain/entities";

export interface CreateHolidayRepository {
  create(holiday: CreateHolidayRepository.Input): Promise<CreateHolidayRepository.Output>
}

export namespace CreateHolidayRepository {
  export type Input = Omit<Holiday, 'participants' | 'id'>
  export type Output = Holiday
}
