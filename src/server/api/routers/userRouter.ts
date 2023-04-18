import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  fromId: publicProcedure.input(
    z.object({
      userId: z.string(),
    })
  ).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
        where: {
          id: input.userId
        }
    });
  }),

  createEvent: publicProcedure.input(
    z.object({
      recipeId: z.string(),
      userId: z.string(),
      date: z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    await ctx.prisma.user.update({
      where: {
        id: input.userId
      },
      data: {
        events: {
          deleteMany: {
            where: {
              date: input.date
            }
          }
        }
      },
    })
    await ctx.prisma.user.update({
      where: {
        id: input.userId
      },
      data: {
        events: {
          push: {recipeId: input.recipeId, date: input.date}
        }
      },
    })
  })
});
