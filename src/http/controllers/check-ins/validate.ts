import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-ins-use-case'

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid()

  })


  const { checkInId } = validateCheckInParamsSchema.parse(req.params)


  const validateInUseCase = makeValidateCheckInUseCase()
  await validateInUseCase.execute({ checkInId })

  return res.status(204).send()
}
