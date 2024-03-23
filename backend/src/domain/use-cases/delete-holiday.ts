export interface DeleteHolidayUseCase {
  execute(holidayId: number): Promise<void>
}
