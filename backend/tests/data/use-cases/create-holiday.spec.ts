import { CreateHolidayRepository } from '../../../src/data/repositories'
import { Holiday, Participant } from '../../../src/domain/entities'

const makeFakeHoliday = (): Holiday => ({
  title: "any title",
  description: "any description",
  date: new Date(),
  location: "any location",
})

interface CreateHolidayUseCase {
  execute(holiday: Holiday): Promise<Holiday>
}

interface CreateParticipantRepository {
  insertAll(holidayId: number, participants: CreateParticipantRepository.Input): Promise<CreateParticipantRepository.Output>
}
export namespace CreateParticipantRepository {
  export type Input = Participant[]
  export type Output = (Participant & { id: number })[]
}

class CreateParticipantRepositoryMock implements CreateParticipantRepository {
  async insertAll(holidayId: number, participants: CreateParticipantRepository.Input): Promise<CreateParticipantRepository.Output> {
    return []
  }
}

class CreateHolidayRepositoryMock implements CreateHolidayRepository {
  async create(holiday: CreateHolidayRepository.Input): Promise<CreateHolidayRepository.Output> {
    return { ...makeFakeHoliday(), id: 1 }
  }
}

class CreateHolidayService implements CreateHolidayUseCase {
  constructor(
    private readonly holidayRepo: CreateHolidayRepository,
    private readonly participantRepo: CreateParticipantRepository
  ) { }

  async execute(holiday: CreateHolidayService.Input): Promise<CreateHolidayService.Output> {
    const createdHoliday = await this.holidayRepo.create({
      title: holiday.title,
      description: holiday.description,
      date: holiday.date,
      location: holiday.location
    })

    const createdParticipants = await this.participantRepo.insertAll(createdHoliday.id, holiday.participants)

    return {
      ...createdHoliday,
      participants: []
    }
  }
}

export namespace CreateHolidayService {
  export type Input = Holiday & { participants: Participant[] }
  export type Output = Holiday & { id: number, participants: CreateParticipantRepository.Output }
}

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
