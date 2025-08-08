"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ILoginForm } from "@/types/auth.interfaces"
import { authService } from "@/services/auth.service"
import { Button } from "@/components/ui/Button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"

const schema = z.object({
	email: z.email("Некорректный формат электронной почты"),
	password: z
		.string()
		.min(8, "Пароль должен содержать не менее 8 символов")
		.regex(
			/^(?=.*[A-Z])(?=.*\d).*$/,
			"Пароль должен содержать как минимум одну заглавную букву и одну цифру",
		),
})

export function LoginForm() {
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: (data: ILoginForm) => authService.login(data),
		onSuccess: async (data) => {
			form.reset()
			const { id, role } = data.user
			push(`/${role.toLowerCase()}/${id}`)
		},
	})

	const onSubmit = (data: z.infer<typeof schema>) => {
		mutate(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Адрес электронной почты</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Войти</Button>
			</form>
		</Form>
	)
}
