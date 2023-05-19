import "@fastify/jwt"

declare module "@fastify/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface FastifyJWT {
    user: {
      sub: string,
    } // user type is return type of `request.user` object
  }
}