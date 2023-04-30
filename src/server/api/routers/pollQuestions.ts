import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pollRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.pollQuestion.findMany({
      select: {
        id: true,
        question: true,
        imageSrc: true,
        options: true,
      },
    });
  }),
  submit: publicProcedure.input(
    z.object({
      pollQuestionId: z.number(),
      option: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    // Create a new PollResponse record for the submitted option
    const newResponse = await ctx.prisma.pollResponse.create({
      data: {
        pollQuestion: {
          connect: {
            id: input.pollQuestionId,
          },
        },
        option: input.option,
      },
    });
  
    return newResponse;
  })
});
