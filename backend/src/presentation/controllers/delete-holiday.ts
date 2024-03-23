import { DeleteHolidayUseCase } from "../../domain/use-cases/delete-holiday";
import { badRequest, ok, serverError } from "../helpers/http";
import { Controller, HttpResponse, Validator } from "../protocols";

type Params = { holidayId: number }

export class DeleteHolidayController implements Controller<Params> {
  constructor(
    private readonly validator: Validator,
    private readonly deleteHolidayService: DeleteHolidayUseCase
  ) {}

  async handle(req: Params): Promise<HttpResponse> {
    const err = this.validator.validate(req)
    if (err) return badRequest(err)

    try {
      await this.deleteHolidayService.execute(req.holidayId)
      return ok('Holiday deleted!')
    } catch(e) {
      return serverError(e)
    }
  }
}
