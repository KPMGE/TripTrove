import { Holiday } from "../../domain/entities";

export interface CreateHolidayRepository {
  create(holiday: Omit<Holiday, 'participants'>): Promise<Holiday>
}
