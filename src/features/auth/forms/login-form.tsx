"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/form"
import { Input } from "@ui/input"
import { PasswordInput } from "@components/password-input"
import { useAuth } from "../hooks/useAuth"
import { type LoginFormValues, loginSchema } from "../schemas/login.schema"

export function LoginForm() {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const { push } = useRouter()
	const { login } = useAuth()

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: LoginFormValues) => {
			await login(data)
		},
		onSuccess: () => {
			form.reset()
			push("/dashboard")
		},
	})

	const onSubmit = (data: LoginFormValues) => {
		mutate(data)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4 lg:gap-6'
			>
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
								<PasswordInput {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					size='lg'
					disabled={isPending}
				>
					Войти
				</Button>
			</form>
		</Form>
	)
}
