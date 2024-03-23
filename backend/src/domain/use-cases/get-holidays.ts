import { Holiday } from "../entities";

export interface GetHolidaysUseCase {
  execute(holidayId?: number): Promise<Holiday | Holiday[]>
}
