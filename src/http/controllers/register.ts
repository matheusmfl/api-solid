import { FastifyRequest, FastifyReply } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '@/libs/prisma'
import { z } from 'zod'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(req.body)

  const password_hash = await hash(password, 2)

  const userExistis = await prisma.user.findUnique({
    where: { email },
  })

  if (userExistis) {
    return res.status(409).send({ message: 'Usuário já existe' })
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  return res.status(201).send()
}
