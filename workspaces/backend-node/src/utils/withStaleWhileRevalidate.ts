import redis from "../services/redis"
import * as msgpackr from "msgpackr"
import logger from "./logger"

export function withStaleWhileRevalidate(
  originalFunction: Function,
  key: string
) {
  return async () => {
    const binary = await redis.getBuffer(key)
    let value: any = binary ? msgpackr.decode(binary) : null

    if (value) {
      logger.info(`RSWR Cache hit for ${key}`)
      revalidateInBackground(originalFunction, key)
      return value
    }

    logger.info(`RSWR Cache miss for ${key}`)
    return await revalidateInBackground(originalFunction, key)
  }
}

async function revalidateInBackground(
  this: any,
  originalFunction: Function,
  key: string
) {
  const result = await originalFunction.apply(this, arguments)
  await redis.set(key, msgpackr.encode(result))
  return result
}
