import { CreateHolidayService } from '../../../src/data/services/create-holiday'
import { makeFakeHoliday } from '../mocks/entities'
import { makeFakeParticipant } from '../mocks/entities/participant'
import { CreateHolidayRepositoryMock } from '../mocks/repositories/create-holiday'
import { CreateParticipantRepositoryMock } from '../mocks/repositories/create-participant'

type SutTypes = {
  sut: CreateHolidayService,
  holidayRepo: CreateHolidayRepositoryMock,
  participantRepo: CreateParticipantRepositoryMock
}

const makeSut = (): SutTypes => {
  const holidayRepo = new CreateHolidayRepositoryMock()
  const participantRepo = new CreateParticipantRepositoryMock()
  const sut = new CreateHolidayService(holidayRepo, participantRepo)
  return { sut, holidayRepo, participantRepo }
}

describe('create-holiday-use-case', () => {
  it('should call the holiday repository with right parameters', async () => {
    const { sut, holidayRepo } = makeSut()
    const fakeHoliday = makeFakeHoliday()
    holidayRepo.create = jest.fn().mockReturnValueOnce({ ...fakeHoliday, id: 1 })

    await sut.execute({ ...fakeHoliday, participants: [] })

    expect(holidayRepo.create).toHaveBeenCalledWith({
      title: fakeHoliday.title,
      description: fakeHoliday.description,
      date: fakeHoliday.date,
      location: fakeHoliday.location,
    })
  })

  it('should call the participants repository with right parameters', async () => {
    const { sut, holidayRepo, participantRepo } = makeSut()
    const fakeHoliday = makeFakeHoliday()

    participantRepo.insertAll = jest.fn()

    const fakeHolidayId = 1
    const fakerHolidayReturn = Promise.resolve({ ...fakeHoliday, id: fakeHolidayId})
    jest.spyOn(holidayRepo, 'create').mockReturnValueOnce(fakerHolidayReturn)

    const fakeParticipants = [makeFakeParticipant(), makeFakeParticipant()]

    await sut.execute({ ...fakeHoliday, participants: fakeParticipants })

    expect(participantRepo.insertAll).toHaveBeenCalledWith(fakeHolidayId, fakeParticipants)
  })

  it('should return the created holiday', async () => {
    const { sut, holidayRepo } = makeSut()
    const fakeHoliday = makeFakeHoliday()

    const fakerHolidayReturn = Promise.resolve({ ...makeFakeHoliday(), id: 1})
    jest.spyOn(holidayRepo, 'create').mockReturnValueOnce(fakerHolidayReturn)

    const createdHoliday = await sut.execute({ ...fakeHoliday, participants: [] })

    expect(createdHoliday).toEqual({...fakeHoliday, id: 1, participants: [] })
  })

  it('throw if holiday repository throws', async () => {
    const { sut, holidayRepo } = makeSut()
    const fakeHoliday = makeFakeHoliday()

    holidayRepo.create = () => { throw new Error() }

    const promise = sut.execute({ ...fakeHoliday, participants: [] })

    await expect(promise).rejects.toThrow()
  })

  it('throw if participant repository throws', async () => {
    const { sut, participantRepo } = makeSut()
    const fakeHoliday = makeFakeHoliday()
  
    participantRepo.insertAll = () => { throw new Error() }
  
    const promise = sut.execute({ ...fakeHoliday, participants: [] })
  
    await expect(promise).rejects.toThrow()
  })
})
