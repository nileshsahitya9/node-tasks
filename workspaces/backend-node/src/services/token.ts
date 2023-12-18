import { User } from "@prisma/client"
import jwt from "jsonwebtoken"
import prisma from "../loaders/prisma"
import config from "../config"

export async function generateAuthToken(user: User) {
  const deviceToken = await prisma.deviceToken.create({
    data: {
      user_id: user.id,
    },
  })
  const token = jwt.sign(
    {
      type: "AUTH_TOKEN",
      data: Buffer.from(deviceToken.id).toString("base64"),
    },
    config.jwt.tokenSecret
  )
  return token
}
