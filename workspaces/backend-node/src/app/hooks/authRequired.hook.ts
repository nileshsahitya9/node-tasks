import { FastifyReply, FastifyRequest } from "fastify"
import { User } from "@prisma/client"
import jwt from "jsonwebtoken"
import config from "../../config"
import prisma from "../../loaders/prisma"

declare module "fastify" {
  interface FastifyRequest {
    user?: User
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
    const data = jwt.verify(token, config.jwt.tokenSecret) as {
      type: string
      data: string
    }
    if (data && data.type === "AUTH_TOKEN") {
      const id = Buffer.from(data.data, "base64").toString()
      const deviceToken = await prisma.deviceToken.findUnique({
        where: {
          id,
        },
        include: {
          user: true,
        },
      })
      console.log(deviceToken)
      if (!deviceToken || deviceToken.disabled) return reply.unauthorized()
      req.user = deviceToken.user
    }
  } catch (error) {
    return reply.unauthorized()
  }
}
