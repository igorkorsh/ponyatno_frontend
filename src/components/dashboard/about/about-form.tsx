"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { IFormProps } from "@/types/dashboard.types"
import { profileService } from "@/services/profile.service"
import { Button } from "@/components/ui/Button"
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/Dialog"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/Form"
import { Textarea } from "@/components/ui/Textarea"
import { About, AboutSchema } from "./about.schema"

export default function AboutForm({ onClose }: IFormProps) {
	const queryClient = useQueryClient()
	const submitButtonRef = useRef<HTMLButtonElement | null>(null)

	const form = useForm<About>({
		resolver: zodResolver(AboutSchema),
		defaultValues: {
			about: "",
		},
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ["profile"],
		mutationFn: async (data: About) => {
			await profileService.update(data)
		},
		onSuccess: () => {
			onClose()
			queryClient.invalidateQueries({ queryKey: ["profile"] })
		},
	})

	const onSubmit = (data: About) => {
		mutate(data)
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>О себе</DialogTitle>
				<DialogDescription></DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
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
					<button
						ref={submitButtonRef}
						type='submit'
						hidden
					/>
				</form>
			</Form>
			<DialogFooter>
				<Button
					type='submit'
					className='w-full'
					onClick={() => submitButtonRef.current?.click()}
					disabled={isPending}
				>
					Сохранить изменения
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
