import { Type } from "@sinclair/typebox"
import withSchema from "../../../core/withSchema"
import prisma from "../../../../loaders/prisma"
import bcrypt from "bcrypt"
import { generateAuthToken } from "../../../../services/token"

export default withSchema({
  schema: {
    body: Type.Object({
      email: Type.String({ format: "email" }),
      password: Type.String({ minLength: 8 }),
      name: Type.Optional(Type.String({ minLength: 1 })),
    }),
  },
  async handler(req, reply) {
    const { email, password, name } = req.body
    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) {
      return {
        authenticated: false,
        message: "USER_ALREADY_EXISTS",
      }
    }
    const hash = bcrypt.hashSync(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hash, name },
    })
    const token = await generateAuthToken(user)
    return {
      authenticated: true,
      token,
    }
  },
})
