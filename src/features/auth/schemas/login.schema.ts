import { z } from "zod"

export const loginSchema = z
	.object({
		email: z.email(),
		password: z.string().min(8).max(64),
	})
	.required()

export type LoginFormValues = z.infer<typeof loginSchema>
