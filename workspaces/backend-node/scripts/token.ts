import prisma from "../src/loaders/prisma"
import { generateAuthToken } from "../src/services/token"

;(async function () {
  const user = await prisma.user.findUnique({
    where: { email: "lottie.tromp7@yahoo.com" },
  })
  const token = await generateAuthToken(user!)
  console.log(token)
})()
