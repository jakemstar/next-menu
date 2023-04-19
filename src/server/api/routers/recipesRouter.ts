import { z } from "zod";
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
    z.object({
      authorId: z.string(),
      createdAt: z.date(),
      desc: z.string(),
      imageUrl: z.string(),
      ingredients: z.object({}),
      published: z.boolean(),
      steps: z.array(z.string()),
      title: z.string(),
      updatedAt: z.date()
    })
  ).mutation(({ctx, input}) => {
    return ctx.prisma.recipe.create({
      data: {
        ...input
      }
    })
  })
});
