import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let GymsRepository: InMemoryGymsRepository

let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    GymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(GymsRepository)

  })


  it('should be able to fetch nearby gyms', async () => {

    await GymsRepository.create({
      title: 'Near Gym',
      latitude: -8.1575706,
      longitude: -34.9142071,
      description: null,
      phone: null
    })

    await GymsRepository.create({
      title: 'Far Gym',
      latitude: -7.1274308,
      longitude: -34.8267561,
      description: null,
      phone: null
    })



    const { gyms } = await sut.execute({
      userLatitude: -8.1575706,
      userLongitude: -34.9142071
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' }),
    ])
  })

})