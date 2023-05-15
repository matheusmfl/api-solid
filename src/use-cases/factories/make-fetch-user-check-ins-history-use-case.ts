import { FetchUserCheckInHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const CheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInHistoryUseCase(CheckInsRepository)

  return useCase
}
