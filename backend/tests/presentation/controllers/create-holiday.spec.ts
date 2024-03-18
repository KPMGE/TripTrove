import { CreateHolidayController } from "../../../src/presentation/controllers/create-holiday"
import { HttpResponse } from "../../../src/presentation/protocols"
import { StatusCodes } from 'http-status-codes'
import { CreateHolidayServiceMock, ValidatorMock } from "../mocks"

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
