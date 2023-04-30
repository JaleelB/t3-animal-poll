import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pollQuestionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.pollQuestion.findMany({
      select: {
        id: true,
        question: true,
        imageSrc: true,
        options: true,
      },
    });
  }),
});
