"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IRegisterForm } from "@/types/auth.interface"
import { useAuth } from "@/hooks/useAuth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type Register, RegisterSchema } from "./register.schema"

export default function RegisterForm() {
	const [error, setError] = useState<string | null>(null)

	const form = useForm<Register>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			role: "TEACHER",
			username: "",
			email: "",
			password: "",
		},
	})

	const { push } = useRouter()
	const { register } = useAuth()

	const { mutate, isPending } = useMutation({
		mutationKey: ["register"],
		mutationFn: async (data: IRegisterForm) => {
			await register(data)
		},
		onSuccess: async (data) => {
			form.reset()
			push("/dashboard")
		},
		onError: (error: AxiosError<{ message: string }>) => {
			const message = error.response?.data?.message || "Произошла неизвестная ошибка"
			setError(message)
		},
	})

	const onSubmit = (data: Register) => {
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
						name='role'
						render={({ field: { onChange, value } }) => (
							<FormItem>
								<Tabs
									defaultValue={value}
									onValueChange={onChange}
								>
									<FormControl>
										<TabsList>
											<TabsTrigger value='TEACHER'>Преподаватель</TabsTrigger>
											<TabsTrigger value='STUDENT'>Ученик</TabsTrigger>
										</TabsList>
									</FormControl>
								</Tabs>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя пользователя</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
						Создать аккаунт
					</Button>
				</form>
			</Form>
		</>
	)
}
