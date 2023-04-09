import { z } from "zod";
import { customAlphabet } from 'nanoid'

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { Prisma } from '@prisma/client';

import { TRPCError } from "@trpc/server";

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7)

export const validations = {
  createNewLink: z.object({
    newLink: z.string().url()
  })
}

const PRISMA_ERROR_MESSAGES = {
  duplicateOriginalLink: 'Unique constraint failed on the fields: (`userId`,`originalLink`)',
  duplicateShortLinkParam: 'Unique constraint failed on the fields: (`shortLinkParam`)'
}

export const ERROR_MESSAGES = {
  internalServerError: 'An unexpected error occurred, please try again later.',
  duplicateOriginalLink: 'A short link already exists for this URL.'
}

export const linkRouter = createTRPCRouter({
  getUserLinks: protectedProcedure.query(async ({ctx}) => {
    const userId = ctx.session.user.id
    const links = await ctx.prisma.link.findMany({
      select: {
        originalLink: true,
        shortLinkParam: true
      },
      where: {
        userId,
      },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    })
    return links
  }),
  createNewLink: protectedProcedure.input(validations.createNewLink).mutation(async ({ctx, input}) => {
    const originalLink = input.newLink
    const userId = ctx.session.user.id

    for(let attempt = 1; attempt <= 10; attempt++){
      const shortLinkParam = nanoid()
      try{
        await ctx.prisma.link.create({
          data: {
            originalLink,
            shortLinkParam,
            userId,
          }
        })
        return
      }catch(error){
        //P2002: prisma error code for unique constraint violation
        if(!(error instanceof  Prisma.PrismaClientKnownRequestError) || error.code !== 'P2002'){
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: ERROR_MESSAGES.internalServerError
          })
        }

        if(error.message.includes(PRISMA_ERROR_MESSAGES.duplicateShortLinkParam)){
          continue
        }
        if(error.message.includes(PRISMA_ERROR_MESSAGES.duplicateOriginalLink)){
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: ERROR_MESSAGES.duplicateOriginalLink
          })
        }
      }
    }
    console.log("ERROR - linkRouter.createNewLink: exceeded maximum duplicate shortLinkParam attempts")
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ERROR_MESSAGES.internalServerError
    })
  })
});
