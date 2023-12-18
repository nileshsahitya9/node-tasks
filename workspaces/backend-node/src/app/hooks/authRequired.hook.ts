import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { DecodedIdToken, getAuth } from "firebase-admin/auth"
import logger from "../../utils/logger"

declare module "fastify" {
  interface FastifyRequest {
    firebaseToken?: DecodedIdToken
  }
}

export default async function authRequiredHook(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const authorization = req.headers.authorization
  if (!authorization) return reply.unauthorized()

  const [_, token] = authorization.split(" ")
  if (!token) return reply.unauthorized()
  try {
    const decodedToken = await getAuth().verifyIdToken(token)
    req.firebaseToken = decodedToken
  } catch (error) {
    if (error?.constructor?.name === "FirebaseAuthError") {
      return reply.unauthorized()
    }
    logger.error(error)
  }
}
