import { Participant } from "../../domain/entities";

export interface GetParticipantsRepository {
  getByHolidayId(holidayId: number): Promise<Participant[]>
}
