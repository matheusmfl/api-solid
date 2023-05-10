import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repositoriy'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('should be able check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'jhoasdasdaadan@gmail.com',
      userId: '123456',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
