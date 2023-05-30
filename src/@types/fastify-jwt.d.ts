import "@fastify/jwt"

declare module "@fastify/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface FastifyJWT {
    user: {
      sub: string,
      role: 'ADMIN' | 'MEMBER'
    } // user type is return type of `request.user` object
  }
}