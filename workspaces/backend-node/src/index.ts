import {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} from "./utils/error"

process.on("uncaughtException", uncaughtExceptionHandler)
process.on("unhandledRejection", unhandledRejectionHandler)

import initApp from "./app"
import logger from "./utils/logger"
import config from "./config"
import loaders from "./loaders"

async function startServer() {
  const app = await initApp()
  await loaders(app)
  const port = config.port
  await app
    .listen({ port, host: "0.0.0.0" })
    .then((address) =>
      logger.info(`${config.name} service listening on ${address}`)
    )
}

startServer().catch((err) => {
  logger.error(err)
  process.exit(1)
})
