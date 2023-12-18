import { Type } from "@sinclair/typebox"
import withSchema from "../../../core/withSchema"
import prisma from "../../../../loaders/prisma"
import bcrypt from "bcrypt"
import { generateAuthToken } from "../../../../services/token"

export default withSchema({
  schema: {
    body: Type.Object({
      email: Type.String({ format: "email" }),
      password: Type.String(),
    }),
  },
  async handler(req, reply) {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return {
        authenticated: false,
        message: "USER_NOT_FOUND",
      }
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return {
        authenticated: false,
        message: "INVALID_PASSWORD",
      }
    }
    const token = await generateAuthToken(user)
    return {
      authenticated: true,
      token,
    }
  },
})
