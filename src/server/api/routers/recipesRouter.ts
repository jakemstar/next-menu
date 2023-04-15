import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const recipesRouter = createTRPCRouter({
  getById: publicProcedure.input(
    z.object({
      recipeId: z.string(),
    })
  ).query(({ ctx, input }) => {
    return ctx.prisma.recipe.findMany({
        where: {
            id: input.recipeId
        }
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany({take: 30});
  })
});
