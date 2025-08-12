import z from "zod"

export const ExperienceSchema = z.object({
	years: z.int().min(1, "Укажите количество лет работы"),
	description: z.string().optional(),
})

export type Experience = z.infer<typeof ExperienceSchema>
