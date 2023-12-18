import { AppInstance } from "../.."
import followUserController from "./controller/followUser.controller"

export default async function userRoutes(app: AppInstance) {
  app.post("/:id/follow", followUserController)
}
