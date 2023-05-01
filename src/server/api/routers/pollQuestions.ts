import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pollRouter = createTRPCRouter({
  getPoll: publicProcedure
  .input(
    z.object({
      pollId: z.number(),
    })
  )
  .query(async ({ ctx, input }) => {
    return await ctx.prisma.pollQuestion.findUnique({
      where:{
        id: input.pollId,
      },
      select: {
        id: true,
        question: true,
        imageSrc: true,
        options: true,
      },
    });
  }),
  getLength: publicProcedure.query(async ({ ctx }) => {
    return (await ctx.prisma.pollQuestion.findMany()).length;
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
