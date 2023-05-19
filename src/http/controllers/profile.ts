import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {

  await req.jwtVerify() // Verifica token passado via Req


  // try {
  //   const authenticateUseCase = makeAuthenticateUseCase()
  //   await authenticateUseCase.execute({ email, password })
  // } catch (err: any) {
  //   if (err instanceof InvalidCredentialsError) {
  //     return res.status(400).send({ message: err.message })
  //   }
  //   throw err
  // }
  return res.status(200).send()
}
