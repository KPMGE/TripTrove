import { Holiday } from "../../domain/entities"

export interface GetHolidaysRepository {
  getAll(): Promise<Holiday[]>
  getById(holidayId: number): Promise<Holiday>
}
