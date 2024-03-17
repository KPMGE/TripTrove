import { Holiday } from "../entities";

export interface CreateHolidayUseCase {
  execute(holiday: Holiday): Promise<Holiday>
}
