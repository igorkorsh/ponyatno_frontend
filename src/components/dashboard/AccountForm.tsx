"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { forwardRef } from "react"
import { FormProps, useForm } from "react-hook-form"
import { z } from "zod"
import { IProfile } from "@/types/profile.interfaces"
import { profileService } from "@/services/profile.service"
import { useProfile } from "@/hooks/useProfile"
import { useSubmitButton } from "@/hooks/useSubmitButton"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"

const schema = z.object({
	firstName: z
		.string()
		.max(128, "Имя должно содержать не более 128 символов")
		.regex(
			/^[a-zA-Zа-яА-ЯёЁ-\s]+$/,
			"Имя может содержать только буквы, пробелы и дефис",
		),
	lastName: z
		.string()
		.max(64, "Фамилия должна содержать не более 64 символов")
		.regex(
			/^[a-zA-Zа-яА-ЯёЁ-\s]+$/,
			"Фамилия может содержать только буквы, пробелы и дефис",
		)
		.optional()
		.or(z.literal("")),
	gender: z.enum(["MALE", "FEMALE"], { error: "Укажите пол" }),
})

export const AccountForm = forwardRef<
	HTMLButtonElement,
	FormProps<z.infer<typeof schema>>
>((_, ref) => {
	const { data } = useProfile()
	const submitButtonRef = useSubmitButton(ref)
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			firstName: data?.firstName,
			lastName: data?.lastName,
			gender: data?.gender,
		},
	})

	const { mutate } = useMutation({
		mutationKey: ["profile"],
		mutationFn: (data: Partial<IProfile>) => profileService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] })
		},
	})

	const onSubmit = (data: z.infer<typeof schema>) => {
		mutate(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid gap-6'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя и отчество*</FormLabel>
								<FormDescription></FormDescription>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Фамилия</FormLabel>
								<FormDescription>
									Ученики не видят вашу фамилию. Она нужна только для
									верификации аккаунта.
								</FormDescription>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='gender'
						render={({ field: { onChange, value } }) => (
							<FormItem>
								<FormLabel>Пол</FormLabel>
								<FormControl>
									<RadioGroup
										defaultValue={value}
										onValueChange={onChange}
										className='flex items-center gap-6'
									>
										<FormItem className='flex items-center gap-2'>
											<FormControl>
												<RadioGroupItem value='MALE' />
											</FormControl>
											<FormLabel className='font-normal'>Мужской</FormLabel>
										</FormItem>
										<FormItem className='flex items-center gap-2'>
											<FormControl>
												<RadioGroupItem value='FEMALE' />
											</FormControl>
											<FormLabel className='font-normal'>Женский</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<button
					ref={submitButtonRef}
					type='submit'
					hidden
				/>
			</form>
		</Form>
	)
})
