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
import { Tabs, TabsList, TabsTrigger } from "@ui/tabs"
import { PasswordInput } from "@components/password-input"
import { USER_ROLES } from "../constants/auth.constants"
import { useAuth } from "../hooks/useAuth"
import {
	type RegisterFormValues,
	registerSchema,
} from "../schemas/register.schema"

export function RegisterForm() {
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			role: "TEACHER",
			name: "",
			email: "",
			password: "",
		},
	})

	const { push } = useRouter()
	const { register } = useAuth()

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: RegisterFormValues) => {
			await register(data)
		},
		onSuccess: () => {
			form.reset()
			push("/dashboard")
		},
	})

	const onSubmit = (data: RegisterFormValues) => {
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
					name='role'
					render={({ field: { onChange, value } }) => (
						<FormItem>
							<Tabs
								defaultValue={value}
								onValueChange={onChange}
							>
								<FormControl>
									<TabsList>
										{Object.entries(USER_ROLES).map(([value, label]) => (
											<TabsTrigger
												key={value}
												value={value}
											>
												{label}
											</TabsTrigger>
										))}
									</TabsList>
								</FormControl>
							</Tabs>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Никнейм</FormLabel>
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
					Создать аккаунт
				</Button>
			</form>
		</Form>
	)
}
