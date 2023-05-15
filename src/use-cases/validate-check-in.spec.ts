import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repositoriy'
import { ValidateCheckInUseCase } from './validate-check-ins'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()

    sut = new ValidateCheckInUseCase(checkInsRepository)


    // await gymsRepository.create({
    //   id: 'jhoasdasdaadan@gmail.com',
    //   title: 'Javascript Gym',
    //   description: '',
    //   phone: '',
    //   latitude: new Decimal(0),
    //   longitude: new Decimal(0)
    // })
    // vi.useFakeTimers()
  })


  afterEach(() => {
    // vi.useRealTimers()
  })

  it('should be able validate the check-in', async () => {

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able validate an inexistent the check-in', async () => {



    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

})