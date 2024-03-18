import { Validator } from "../../../src/presentation/protocols";

export class ValidatorMock implements Validator {
  validate(data: any): Error {
    return null
  }
}
