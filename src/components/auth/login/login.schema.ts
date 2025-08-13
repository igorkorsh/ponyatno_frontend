import z from "zod"

export const LoginSchema = z.object({
	email: z.email("Некорректный формат электронной почты"),
	password: z
		.string()
		.min(8, "Пароль должен содержать не менее 8 символов")
		.max(64, "Пароль должен содержать не более 64 символов")
		.regex(
			/^(?=.*[A-Z])(?=.*\d).*$/,
			"Пароль должен содержать как минимум одну заглавную букву и одну цифру",
		),
})

export type Login = z.infer<typeof LoginSchema>
