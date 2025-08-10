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
	FormMessage,
} from "@/components/ui/Form"
import { Textarea } from "@/components/ui/Textarea"

const schema = z.object({
	about: z.string().max(128, "Имя должно содержать не более 128 символов"),
})

export const AboutForm = forwardRef<
	HTMLButtonElement,
	FormProps<z.infer<typeof schema>>
>((_, ref) => {
	const { data } = useProfile()
	const submitButtonRef = useSubmitButton(ref)
	const queryClient = useQueryClient()

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			about: data?.about,
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
						name='about'
						render={({ field }) => (
							<FormItem>
								<FormDescription>
									Расскажите о своих ценностях, индивидуальных особенностях
									и&nbsp;предпочтениях. Это поможет ученикам и&nbsp;родителям
									узнать вас получше. Не&nbsp;добавляйте сюда ссылки, контакты
									и&nbsp;цены на услуги.
								</FormDescription>
								<FormControl>
									<Textarea {...field} />
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
