export interface DeleteHolidayRepository {
  delete(holidayId: number): Promise<void>
}
