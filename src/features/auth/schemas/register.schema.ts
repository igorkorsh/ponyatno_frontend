import { z } from "zod"

export const registerSchema = z
	.object({
		role: z.enum(["TEACHER", "STUDENT"]),
		name: z.string().trim().min(3).max(32),
		email: z.email(),
		password: z.string().min(8).max(64),
	})
	.required()

export type RegisterFormValues = z.infer<typeof registerSchema>
