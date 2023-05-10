import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repositoriy'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'jhoasdasdaadan@gmail.com',
      userId: '123456',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'jhoasdasdaadan@gmail.com',
      userId: '123456',
    })

    await expect(() =>
      sut.execute({
        gymId: 'jhoasdasdaadan@gmail.com',
        userId: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'jhoasdasdaadan@gmail.com',
      userId: '123456',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'jhoasdasdaadan@gmail.com',
      userId: '123456',
    })

    expect(checkIn.id).toEqual(expect.any(String))


  })
})
