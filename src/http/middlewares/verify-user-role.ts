import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (req: FastifyRequest, res: FastifyReply) => {

    const { role } = req.user


    if (role !== roleToVerify) {
      return res.code(401).send({ message: 'Unauthorized' })
    }
  }
}