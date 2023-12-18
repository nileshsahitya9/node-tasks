import { AppInstance } from "../.."
import loginController from "./controllers/login.controller"
import signupController from "./controllers/signup.controller"

export default async function authRoutes(app: AppInstance) {
  app.post("/login", loginController)
  app.post("/signup", signupController)
}
