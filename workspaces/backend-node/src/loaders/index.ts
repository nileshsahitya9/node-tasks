import { AppInstance } from "../app"
import sleep from "../utils/sleep"
import prisma from "./prisma"

export default async function loaders(_app: AppInstance) {
  let retries = 1
  while (retries <= 5) {
    try {
      await import("../services/redis")
      await prisma.$connect()
      break
    } catch (error) {
      await sleep(5000)
      retries++
      if (retries >= 5) {
        throw error
      }
    }
  }
}
