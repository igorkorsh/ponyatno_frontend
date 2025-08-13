"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { IProfile } from "@/types/profile.types"
import { profileService } from "@/services/profile.service"
import { FormWrapper } from "@/components/common/form-wrapper"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { type AboutFormValues, AboutSchema } from "./about.schema"

interface AboutFormProps {
	data: IProfile
	onClose: () => void
}

export function AboutForm({ data, onClose }: AboutFormProps) {
	const queryClient = useQueryClient()
	const submitButtonRef = useRef<HTMLButtonElement | null>(null)

	const form = useForm({
		resolver: zodResolver(AboutSchema),
		defaultValues: {
			about: data.about || "",
		},
	})

	const { mutate } = useMutation({
		mutationKey: ["dashboard"],
		mutationFn: async (data: Partial<AboutFormValues>) => {
			await profileService.updateMyProfile(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dashboard"] })
			onClose?.()
		},
	})

	const onSubmit = (data: Partial<AboutFormValues>) => {
		mutate(data)
	}

	return (
		<FormWrapper
			title='О себе'
			description='Расскажите о своих ценностях, индивидуальных особенностях и предпочтениях. Это поможет ученикам и родителям узнать вас получше. Не добавляйте сюда ссылки, контакты и цены на услуги.'
			buttonText='Сохранить изменения'
			onSubmit={() => submitButtonRef.current?.click()}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid gap-6'>
						<FormField
							control={form.control}
							name='about'
							render={({ field }) => (
								<FormItem>
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
		</FormWrapper>
	)
}
