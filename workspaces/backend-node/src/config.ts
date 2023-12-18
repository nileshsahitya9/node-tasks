const meta = require("../package.json")

const config = {
  name: meta.name,
  port: 1337,
  redis: {
    host: process.env.REDIS_HOST || "0.0.0.0",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || "",
  },
  jwt: {
    tokenSecret: process.env.JWT_TOKEN_SECRET || "iguessyoucantguessme",
  },
}

export default config
