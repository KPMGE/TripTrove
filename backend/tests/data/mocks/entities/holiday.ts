import { Holiday } from "../../../../src/domain/entities";

export const makeFakeHoliday = (): Holiday => ({
  title: "any title",
  description: "any description",
  date: new Date(),
  location: "any location",
})
