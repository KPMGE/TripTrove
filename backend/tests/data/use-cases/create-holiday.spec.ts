import { Holiday } from '../../../src/domain/entities'

interface CreateHolidayRepository {
  create(holiday: Omit<Holiday, 'participants'>): Promise<Holiday>
}

interface CreateHolidayUseCase {
  execute(holiday: Holiday): Promise<Holiday>
}

class CreateHolidayRepositoryMock implements CreateHolidayRepository {
  input = null
  output = null

  create(holiday: Omit<Holiday, 'participants'>): Promise<Holiday> {
    this.input = holiday
    return this.output
  }
}

class CreateHolidayService implements CreateHolidayUseCase {
  constructor(
    private readonly holidayRepo: CreateHolidayRepository
  ) {}

  async execute(holiday: Holiday): Promise<Holiday> {
    this.holidayRepo.create({
      title: holiday.title,
      description: holiday.description,
      date: holiday.date,
      location: holiday.location
    })
    return null
  }
}

describe('create-holiday-use-case', () => {
  it('should call the repository with right parameters', async () => {
    const repo = new CreateHolidayRepositoryMock()
    const sut = new CreateHolidayService(repo)
    const fakeHoliday: Holiday = {
      title: "any title",
      description: "any description",
      date: new Date(),
      location: "any location",
      participants: []
    }

    await sut.execute(fakeHoliday)

    expect(repo.input).toEqual({
      title: fakeHoliday.title,
      description: fakeHoliday.description,
      date: fakeHoliday.date,
      location: fakeHoliday.location,
    })
  })
})
