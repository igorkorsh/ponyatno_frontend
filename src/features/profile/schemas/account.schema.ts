import { z } from "zod"

export const accountSchema = z.object({
	firstName: z.string().min(1).max(48),
	lastName: z.optional(z.string().max(32)),
	gender: z.enum(["MALE", "FEMALE"]),
	birthDate: z.optional(z.date()),
})

export type AccountFormValues = z.infer<typeof accountSchema>
