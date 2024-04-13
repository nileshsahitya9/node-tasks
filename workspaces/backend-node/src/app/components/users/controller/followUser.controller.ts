import prisma from "../../../../loaders/prisma";
import withSchema from "../../../core/withSchema";

export default withSchema({
  schema: {},
  async handler(req, reply) {
    try {
      const { id } = req.params as { id: string };
      
      const userToFollow = await prisma.user.findUnique({
        where: { id },
      });
      
      if (!userToFollow) {
        return reply.notFound("User not found");
      }

      const existingFollow = await prisma.follow.findFirst({
        where: {
          follower_id: req.user!.id,
          following_id: id,
        },
      });

      if (existingFollow) {
        return reply.conflict("You are already following this user");
      }

      await prisma.follow.create({
        data: {
          follower_id: req.user!.id,
          following_id: id,
        },
      });

      return reply.code(201).send("Successfully followed user");
    } catch (error) {
      console.error("Error following user:", error);
      return reply.internalServerError();
    }
  },
});
