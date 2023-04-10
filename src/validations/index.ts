import { z } from "zod";

export const validations = {
  isValidUrl: z.object({
    newLink: z.string().url()
  })
}