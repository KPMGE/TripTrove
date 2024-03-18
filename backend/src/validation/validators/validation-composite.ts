import { Validator } from "../../presentation/protocols";

export class ValidationComposite implements Validator {
  constructor(private readonly validators: Validator[]) { }
  validate(data: any): Error {
    for (const validator of this.validators) {
      const err = validator.validate(data)
      if (err) return err
    }
  }
}
