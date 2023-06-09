import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repositoriy'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)


    await gymsRepository.create({
      id: 'jhoasdasdaadan@gmail.com',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0)
    })
    vi.useFakeTimers()
  })


  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able check in', async () => {


    const { checkIn } = await sut.execute({
      gymId: 'jhoasdasdaadan@gmail.com',
      userId: '123456',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'jhoasdasdaadan@gmail.com',
      userId: '123456',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'jhoasdasdaadan@gmail.com',
        userId: '123456',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'jhoasdasdaadan@gmail.com',
      userId: '123456',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'jhoasdasdaadan@gmail.com',
      userId: '123456',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))


  })
})

it('should not be able check in on distant gym', async () => {

  gymsRepository.items.push({
    id: 'gym-2',
    title: 'Javascript Gym',
    description: '',
    phone: '',
    latitude: new Decimal(-8.1575706),
    longitude: new Decimal(-34.9142071)
  })


  await expect(() =>
    sut.execute({
      gymId: 'gym-2',
      userId: '123456',
      userLatitude: -8.1196011,
      userLongitude: -34.899247,
    })
  ).rejects.toBeInstanceOf(MaxDistanceError)


})