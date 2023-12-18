import { Type } from "@sinclair/typebox"
import withSchema from "../../../core/withSchema"
import prisma from "../../../../loaders/prisma"

export default withSchema({
  schema: {
    body: Type.Object({
      body: Type.String({ minLength: 1 }),
      visibility: Type.String(),
    }),
  },
  async handler(req, reply) {
    const { body, visibility } = req.body
    const post = await prisma.post.create({
      data: {
        body,
        author_id: req.user!.id,
        visibility,
      },
    })
    return {
      post,
    }
  },
})
