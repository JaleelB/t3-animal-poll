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
  }),
  // New procedure to fetch the total count of "yes" and "no" answers
  getTotalAnswers: publicProcedure.query(async ({ ctx }) => {
    const totalYes = await ctx.prisma.pollResponse.count({
      where: {
        option: "yes",
      },
    });
    const totalNo = await ctx.prisma.pollResponse.count({
      where: {
        option: "no",
      },
    });
    return { totalYes, totalNo };
  }),
  // New procedure to fetch the percentage of responses for each option in every question
  getQuestionStatistics: publicProcedure.query(async ({ ctx }) => {
    const calculatePercentage = (count: number, total: number) => {
      return total > 0 ? Math.round((count / total) * 100) : 0;
    };
  
    const questions = await ctx.prisma.pollQuestion.findMany({
      select: {
        id: true,
        question: true,
        options: true,
      },
    });
  
    const statistics = await Promise.all(
      questions.map(async (question) => {
        const totalResponses = await ctx.prisma.pollResponse.count({
          where: {
            pollQuestion: {
              id: question.id,
            },
          },
        });
  
        const optionStats: Record<string, number> = {};
  
        // Check if question.options is not null, and use an empty array as a fallback
        // Create a new variable to store options as an array of strings
        const optionsArray: string[] = question.options ? (question.options as string[]) : [];
  
        for (const option of optionsArray) {
          const optionCount = await ctx.prisma.pollResponse.count({
            where: {
              pollQuestion: {
                id: question.id,
              },
              option,
            },
          });
          optionStats[option] = calculatePercentage(optionCount, totalResponses);
        }
  
        return {
          ...question,
          statistics: optionStats,
        };
      })
    );
  
    return statistics;
  }),  
});
