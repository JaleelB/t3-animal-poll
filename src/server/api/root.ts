import { createTRPCRouter } from "~/server/api/trpc";
import { pollQuestionsRouter } from "~/server/api/routers/pollQuestions";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  questions: pollQuestionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
