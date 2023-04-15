import { createTRPCRouter } from "~/server/api/trpc";
import { recipesRouter } from "~/server/api/routers/recipesRouter";
import { usersRouter } from "./routers/userRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recipes: recipesRouter,
  users: usersRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
