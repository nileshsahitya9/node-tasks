import { Type } from "@sinclair/typebox"
import prisma from "../../../../loaders/prisma"
import withSchema from "../../../core/withSchema"

export default withSchema({
  schema: {},
  async handler(req, reply) {
    const following = await prisma.follow.findMany({
      where: { follower_id: req.user!.id },
      include: {
        following: {
          select: {
            posts: {
              where: {
                AND: [
                  { deleted_at: null },
                  {
                    OR: [
                      {
                        published_at: {
                          lte: new Date(),
                        },
                      },
                      {
                        published_at: null,
                      },
                    ],
                  },
                  // Filter based on visibility
                  {
                    NOT: [{ visibility: "private" }],
                  },
                ],
              },
            },
          },
        },
      },
    })

    const posts = following.flatMap((follow) =>
      follow.following.posts.map((post) => {
        return {
          ...post,
          isRecent: post.published_at
            ? new Date().getTime() - post.published_at.getTime() <
              7 * 24 * 60 * 60 * 1000
            : false,
        }
      })
    )

    return {
      posts,
    }
  },
})
