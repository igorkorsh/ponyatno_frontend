import { z } from "zod"

export const aboutSchema = z.object({
	about: z.optional(z.string().max(2048)),
})

export type AboutFormValues = z.infer<typeof aboutSchema>
