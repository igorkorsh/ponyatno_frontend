"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ILoginForm } from "@/types/auth.types"
import { useAuth } from "@/hooks/useAuth"
import { Alert, AlertDescription } from "@/components/ui/Alert"
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
import { type Login, LoginSchema } from "./login.schema"

export default function LoginForm() {
	const [error, setError] = useState<string | null>(null)

	const form = useForm<Login>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const { push } = useRouter()
	const { login } = useAuth()

	const { mutate, isPending } = useMutation({
		mutationKey: ["login"],
		mutationFn: async (data: ILoginForm) => {
			await login(data)
		},
		onSuccess: async (data) => {
			form.reset()
			push("/dashboard")
		},
		onError: (error: AxiosError<{ message: string }>) => {
			const message =
				error.response?.data?.message || "Произошла неизвестная ошибка"
			setError(message)
		},
	})

	const onSubmit = (data: Login) => {
		setError(null)
		mutate(data)
	}

	return (
		<>
			{error && (
				<Alert variant='destructive'>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-6'
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
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						size='lg'
						className='w-full'
						disabled={isPending}
					>
						Войти
					</Button>
				</form>
			</Form>
		</>
	)
}
