import { Validator } from "../../../presentation/protocols";
import { RequiredFieldValidator, ValidationComposite } from "../../../validation/validators";

export const makeDeleteHolidayValidator = (): Validator => {
  const validators = [
    new RequiredFieldValidator('holidayId')
  ]

  return new ValidationComposite(validators)
}
