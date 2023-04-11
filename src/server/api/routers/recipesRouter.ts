import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const recipesRouter = createTRPCRouter({
  findMany: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany();
  }),
});
