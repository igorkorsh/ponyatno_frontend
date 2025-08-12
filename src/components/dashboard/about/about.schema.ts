import z from "zod"

export const AboutSchema = z.object({
	about: z.string().max(500, "Максимальная длина описания – 500 символов"),
})

export type About = z.infer<typeof AboutSchema>
