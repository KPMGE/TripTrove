export interface DeleteParticipantRepository {
  deleteAllByHolidayId(holidayId: number): Promise<void>
}
