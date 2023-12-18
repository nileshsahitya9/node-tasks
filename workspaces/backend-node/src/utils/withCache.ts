import redis from "../services/redis"
import * as msgpackr from "msgpackr"

type withCahcePropType<T> = {
  key: string
  /**
   * ex in seconds
   */
  ex?: number
  fn: () => Promise<T | null>
}

export default async function withCache<T>({
  key,
  ex,
  fn,
}: withCahcePropType<T>): Promise<T> {
  const binary = await redis.getBuffer(key)
  let value: T | null = binary ? msgpackr.decode(binary) : null

  if (!value) {
    const result = await fn()
    if (result) {
      if (ex) await redis.setex(key, ex, msgpackr.encode(result))
      else await redis.set(key, msgpackr.encode(result))
    }
    value = result
  }

  return value as T
}
