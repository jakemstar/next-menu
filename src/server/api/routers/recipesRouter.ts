import { z } from "zod";
import { recipeInputSchema } from "~/pages/create";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const recipesRouter = createTRPCRouter({
  getById: publicProcedure.input(
    z.object({
      recipeId: z.string(),
    })
  ).query(({ ctx, input }) => {
    return ctx.prisma.recipe.findFirst({
        where: {
            id: input.recipeId
        }
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany({take: 30});
  }),
  create: publicProcedure.input(
    recipeInputSchema
  ).mutation(({ctx, input}) => {
    return ctx.prisma.recipe.create({
      data: {
        ...input
      }
    })
  })
});
