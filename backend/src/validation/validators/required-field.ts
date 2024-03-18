import { MissingParamError } from "../../presentation/errors/missing-param";
import { Validator } from "../../presentation/protocols";

export class RequiredFieldValidator implements Validator {
  constructor(private readonly fieldName: string) { }

  validate(data: any): Error {
    if (!data[this.fieldName]) return new MissingParamError(this.fieldName)
  }
}
