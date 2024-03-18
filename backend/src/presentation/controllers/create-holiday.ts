import { CreateHolidayService } from "../../data/services/create-holiday";
import { CreateHolidayUseCase } from "../../domain/use-cases";
import { MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http";
import { Controller, Validator, HttpResponse } from "../protocols";

export class CreateHolidayController implements Controller<CreateHolidayService.Input> {
  constructor(
    private readonly service: CreateHolidayUseCase,
    private readonly validator: Validator
  ) { }

  async handle(req: CreateHolidayService.Input): Promise<HttpResponse> {
    const err = this.validator.validate(req)
    if (err) return badRequest(err)

    try {
      const createdHoliday = await this.service.execute(req)
      return ok(createdHoliday)
    } catch(err) {
      if (err instanceof MissingParamError) {
        return badRequest(err)
      }
      return serverError(err)
    }
  }
}
