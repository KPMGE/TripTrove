import { Holiday } from "../../../../src/domain/entities";

export const makeFakeHoliday = (): Holiday => ({
  id: 1,
  title: "any title",
  description: "any description",
  date: new Date(),
  location: "any location",
})
