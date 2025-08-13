import { z } from "zod"

export const AccountSchema = z.object({
	firstName: z
		.string()
		.min(1, "Обязательное поле")
		.max(128, "Имя должно содержать не более 128 символов")
		.regex(
			/^[a-zA-Zа-яА-ЯёЁ-\s]+$/,
			"Имя может содержать только буквы, пробелы и дефис",
		),
	lastName: z.optional(
		z
			.string()
			.max(128, "Фамилия должна содержать не более 128 символов")
			.regex(
				/^[a-zA-Zа-яА-ЯёЁ-\s]*$/,
				"Фамилия может содержать только буквы, пробелы и дефис",
			),
	),
	birthDate: z.optional(z.string()),
	gender: z.enum(["MALE", "FEMALE"], {
		message: "Обязательное поле",
	}),
	isActive: z.boolean().default(true),

	// avatar: z.string(),
})

export type Account = z.infer<typeof AccountSchema>
