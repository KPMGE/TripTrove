import { GetHolidaysService } from "../../data/services";
import { GetHolidaysUseCase } from "../../domain/use-cases";
import { MissingParamError } from "../errors";
import { badRequest, ok, serverError } from "../helpers/http";
import { Controller, HttpResponse } from "../protocols";

export class GetHolidaysController implements Controller<{ holidayId?: number }> {
  constructor(
    private readonly service: GetHolidaysUseCase,
  ) { }

  async handle(req: { holidayId?: number}): Promise<HttpResponse> {
    try {
      const holidays = await this.service.execute(req.holidayId)
      return ok(holidays)
    } catch(err) {
      if (err instanceof MissingParamError) {
        return badRequest(err)
      }
      return serverError(err)
    }
  }
}
