import { AppInstance } from "../.."
import createPostController from "./controllers/createPost.controller"
import getUserFeedController from "./controllers/getUserFeed.controller"

export default async function postsRoutes(app: AppInstance) {
  app.get("/feed", getUserFeedController)
  app.post("/", createPostController)
}
