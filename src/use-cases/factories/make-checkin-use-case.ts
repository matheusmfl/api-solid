import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const CheckInsRepository = new PrismaCheckInsRepository()
  const gymsRepositoryRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(CheckInsRepository, gymsRepositoryRepository)

  return useCase
}
