import { AppInstance } from "."
import authRoutes from "./components/auth/auth.routes"
export default async function v1Routes(app: AppInstance) {
  app.register(authRoutes, { prefix: "/auth" })
}
