import { CreateHolidayRepository } from '../../../src/data/repositories'
import { Holiday } from '../../../src/domain/entities'

interface CreateHolidayUseCase {
  execute(holiday: Holiday): Promise<Holiday>
}

class CreateHolidayRepositoryMock implements CreateHolidayRepository {
  input = null
  output = null

  create(holiday: Omit<Holiday, 'participants'>): Promise<Holiday> {
    this.input = this.output = holiday
    return this.output
  }
}

class CreateHolidayService implements CreateHolidayUseCase {
  constructor(
    private readonly holidayRepo: CreateHolidayRepository
  ) { }

  async execute(holiday: Holiday): Promise<Holiday> {
    const createdHoliday = await this.holidayRepo.create({
      title: holiday.title,
      description: holiday.description,
      date: holiday.date,
      location: holiday.location
    })

    return createdHoliday
  }
}

type SutTypes = {
  sut: CreateHolidayService,
  repo: CreateHolidayRepositoryMock
}

const makeSut = (): SutTypes => {
  const repo = new CreateHolidayRepositoryMock()
  const sut = new CreateHolidayService(repo)
  return { sut, repo }
}

const makeFakeHoliday = (): Holiday => ({
  title: "any title",
  description: "any description",
  date: new Date(),
  location: "any location",
  participants: []
})

describe('create-holiday-use-case', () => {
  it('should call the repository with right parameters', async () => {
    const { sut, repo } = makeSut()
    const fakeHoliday = makeFakeHoliday()

    await sut.execute(fakeHoliday)

    expect(repo.input).toEqual({
      title: fakeHoliday.title,
      description: fakeHoliday.description,
      date: fakeHoliday.date,
      location: fakeHoliday.location,
    })
  })

  it('should return the created holiday from repository', async () => {
    const { sut, repo } = makeSut()
    const fakeHoliday = makeFakeHoliday()

    repo.output = makeFakeHoliday()

    const createdHoliday = await sut.execute(fakeHoliday)

    const {participants, ...holiday} = createdHoliday

    expect(holiday).toEqual(repo.output)
  })
})
