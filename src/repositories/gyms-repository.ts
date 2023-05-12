import { Gym } from '@prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<CheckIn | null>
}
