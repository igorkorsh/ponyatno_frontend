import { z } from "zod"

export const FilterSchema = z.object({
	subject: z.string(),
	price: z
		.object({
			min: z.number().min(0).max(20000),
			max: z.number().min(0).max(20000),
		})
		.refine((data) => data.min <= data.max),
})

export type FilterFormValues = z.infer<typeof FilterSchema>
