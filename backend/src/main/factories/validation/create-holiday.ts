import { Validator } from "../../../presentation/protocols"
import { RequiredFieldValidator, ValidationComposite } from "../../../validation/validators"

export const makeCreateHolidayValidation = (): Validator => {
  let validators = [
    new RequiredFieldValidator('title'),
    new RequiredFieldValidator('description'),
    new RequiredFieldValidator('date'),
    new RequiredFieldValidator('location'),
    new RequiredFieldValidator('participants'),
  ]

  const composite = new ValidationComposite(validators)
  
  return composite
}
