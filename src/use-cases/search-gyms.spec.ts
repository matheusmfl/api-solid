import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let GymsRepository: InMemoryGymsRepository

let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    GymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(GymsRepository)

  })


  it('should be able to search for gyms', async () => {

    await GymsRepository.create({
      title: 'JS Gyms',
      latitude: -8.1575706,
      longitude: -34.9142071,
      description: null,
      phone: null
    })

    await GymsRepository.create({
      title: 'TS Gyms',
      latitude: -8.1575706,
      longitude: -34.9142071,
      description: null,
      phone: null
    })

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JS Gyms' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {

    for (let i = 1; i <= 22; i++) {
      await GymsRepository.create({
        title: `JS Gyms ${i}`,
        latitude: -8.1575706,
        longitude: -34.9142071,
        description: null,
        phone: null
      })
    }



    const { gyms } = await sut.execute({
      query: 'JS',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JS Gyms 21' }),
      expect.objectContaining({ title: 'JS Gyms 22' })
    ])
  })
})