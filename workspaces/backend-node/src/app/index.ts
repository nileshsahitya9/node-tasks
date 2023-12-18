import Fastify from "fastify"
import cors from "@fastify/cors"
import sensible from "@fastify/sensible"
import helmet from "@fastify/helmet"
import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"
import logger from "../utils/logger"
import config from "../config"
import addFormats from "ajv-formats"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import v1Routes from "./v1"
import { fastifyPlugin } from "@atlys/shared"

export default async function initApp() {
  const app = Fastify({
    ignoreTrailingSlash: true,
    logger: false,
    trustProxy: true,
    disableRequestLogging: true,
    ajv: {
      plugins: [addFormats, require("@fastify/multipart").ajvFilePlugin],
    },
  }).withTypeProvider<TypeBoxTypeProvider>()

  await app.register(helmet, {
    global: false,
    contentSecurityPolicy: process.env.NODE_ENV !== "development",
  })

  await app.register(sensible, {})

  app.register(fastifyPlugin, {
    useHeader: true,
    headerName: "x-request-id",
  })

  await app.register(cors, {})

  if (process.env.NODE_ENV === "development") {
    await app.register(swagger, {
      swagger: {
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        info: {
          title: `${config.name} Service API`,
          description: `Documentation / API Routes for ${config.name} service`,
          version: "1.0",
        },
      },
    })

    await app.register(swaggerUI, {
      routePrefix: "/docs",
      staticCSP: false,
    })
  }

  app.addHook("onRequest", async (req, reply) => {
    const ip =
      typeof req.headers["cf-connecting-ip"] === "object"
        ? req.headers["cf-connecting-ip"][0]
        : req.headers["cf-connecting-ip"]?.split(",") || req.ip
    reply.header("Pragma", "no-cache")
    reply.header(
      "Cache-Control",
      "private, no-cache, no-store, must-revalidate, max-age=0"
    )
    logger.info({
      req: {
        method: req.raw.method,
        url: req.raw.url,
        headers: req.raw.headers,
        query: req.query,
        ip,
      },
      msg: "request received",
    })
  })

  app.addHook("onResponse", async (req, reply) => {
    logger.info({
      msg: "request completed",
      req: {
        method: req.raw.method,
        url: req.raw.url,
        headers: req.raw.headers,
        query: req.query,
      },
      res: {
        statusCode: reply.raw.statusCode,
        message: reply.raw.statusMessage,
      },
    })
  })

  app.get("/", async (req, reply) => {
    return {
      success: true,
    }
  })

  app.register(v1Routes, { prefix: "/api/v1" })

  app.setErrorHandler(function (error, request, reply) {
    if (error.statusCode) {
      reply.send(error)
    } else {
      logger.error({
        err: error,
      })
      reply.send(new Error("Something went wrong"))
    }
  })

  return app
}

export type AppInstance = Awaited<ReturnType<typeof initApp>>
