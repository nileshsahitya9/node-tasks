import { Type } from "@sinclair/typebox"
import prisma from "../../../../loaders/prisma"
import withSchema from "../../../core/withSchema"
import withCache from "../../../../utils/withCache"
import logger from "../../../../utils/logger"

const PAGE_SIZE = 10

export default withSchema({
  schema: {
    querystring: Type.Object({
      page: Type.Number(),
    }),
  },
  async handler(req, reply) {
    const { page } = req.query

    const cacheKey = `user:${req.user!.id}:feed:page${page}`

    const getCachedPosts = async () => {
      const cachedPosts = await withCache({
        key: cacheKey,
        ex: 1800, // 30 minute TTL
        fn: async () => {
          try {
            const followerIds = await prisma.follow.findMany({
              where: { follower_id: req.user!.id },
              select: { following_id: true },
            }).then((follows: any) => follows.map((follow: any) => follow.follower_id));
  
  
            const postsList = await prisma.post.findMany({
              where: {
                author_id: { in: followerIds },
                deleted_at: null,
                OR: [
                  { published_at: { lte: new Date() } },
                  { published_at: null },
                ],
                visibility: { not: "private" },
              },
              orderBy: { created_at: "desc" },
              skip: (page - 1) * PAGE_SIZE,
              take: PAGE_SIZE,
            })
  
            const posts = postsList.map((post: any) => {
              return {
                ...post,
                isRecent: post.published_at
                  ? new Date().getTime() - post.published_at.getTime() <
                    7 * 24 * 60 * 60 * 1000
                  : false,
              }
            })
  
            return {
              posts,
            }
          } catch (err) {
            logger.error({
              err,
            });
            return reply.send(err);
          }
        },
      })

      return cachedPosts
    }

    return await getCachedPosts()
  },
})