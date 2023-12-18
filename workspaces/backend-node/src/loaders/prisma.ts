import { PrismaClient } from "@prisma/client"
import logger from "../utils/logger"

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
})

prisma.$on("query", (e) => {
  logger.debug({
    msg: "query",
    query: e.query,
    params: e.params,
    duration: `${e.duration}ms`,
  })
})

export default prisma
