import { response } from "express"
import { Holiday } from "../../../src/domain/entities"
import { CreateHolidayUseCase } from "../../../src/domain/use-cases"
import { CreateHolidayController } from "../../../src/presentation/controllers/create-holiday"
import { HttpResponse, Validator } from "../../../src/presentation/protocols"
import { makeFakeHoliday } from "../../data/mocks/entities"
import { StatusCodes } from 'http-status-codes'

class CreateHolidayServiceMock implements CreateHolidayUseCase {
  async execute(holiday: Holiday): Promise<Holiday> {
    return makeFakeHoliday()
  }
}

class ValidatorMock implements Validator {
  validate(data: any): Error {
    return null
  }
}

describe('create-holiday-controller', () => {
  it('should return bad request if validator returns error', async () => {
    const serviceMock = new CreateHolidayServiceMock()
    const validatorMock = new ValidatorMock()
    const sut = new CreateHolidayController(serviceMock, validatorMock)

    jest.spyOn(validatorMock, 'validate').mockReturnValueOnce(new Error('validation error'))

    const response: HttpResponse = await sut.handle({
      title: "any title",
      description: "any description",
      date: new Date(),
      location: "any location",
      participants: []
    })

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toEqual(new Error('validation error'))
  })
})
