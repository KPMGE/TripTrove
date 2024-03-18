import { CreateHolidayController } from "../../../src/presentation/controllers/create-holiday"
import { HttpResponse } from "../../../src/presentation/protocols"
import { StatusCodes } from 'http-status-codes'
import { CreateHolidayServiceMock, ValidatorMock } from "../mocks"
import { makeFakeParticipant } from "../../data/mocks/entities/participant"

const makeFakeCreateHolidayRequest = () => ({
  title: "any title",
  description: "any description",
  date: new Date(),
  location: "any location",
  participants: [makeFakeParticipant()]
})

describe('create-holiday-controller', () => {
  it('should return bad request if validator returns error', async () => {
    const serviceMock = new CreateHolidayServiceMock()
    const validatorMock = new ValidatorMock()
    const sut = new CreateHolidayController(serviceMock, validatorMock)

    jest.spyOn(validatorMock, 'validate').mockReturnValueOnce(new Error('validation error'))

    const response: HttpResponse = await sut.handle(makeFakeCreateHolidayRequest())

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(response.body).toEqual(new Error('validation error'))
  })

  it('should return server error if service throws', async () => {
    const serviceMock = new CreateHolidayServiceMock()
    const validatorMock = new ValidatorMock()
    const sut = new CreateHolidayController(serviceMock, validatorMock)
    serviceMock.execute = () => { throw new Error('service error') }

    const response: HttpResponse = await sut.handle(makeFakeCreateHolidayRequest())

    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(response.body).toEqual(new Error('service error'))
  })
})
