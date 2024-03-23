import { Holiday } from "../entities";

export interface CreateHolidayUseCase {
  execute(holiday: Omit<Holiday, 'id'>): Promise<Holiday>
}
