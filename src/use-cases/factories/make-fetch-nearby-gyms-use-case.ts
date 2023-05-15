import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function ma() {
  const GymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(GymsRepository)

  return useCase
}
