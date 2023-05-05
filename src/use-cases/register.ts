import { prisma } from '@/libs/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 2)

  const userExistis = await prisma.user.findUnique({
    where: { email },
  })

  if (userExistis) {
    throw new Error('User already existis')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
