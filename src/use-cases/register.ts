import { UsersRepository } from '@/repositories/prisma/users-repository'

import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 2)

    const userExistis = await this.usersRepository.findByEmail(email)

    if (userExistis) {
      throw new Error('User already existis')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
