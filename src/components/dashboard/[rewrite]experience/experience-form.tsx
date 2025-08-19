"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { IExperience, IFormProps } from "@/types/dashboard.interface"
import { experienceService } from "@/services/experience.service"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Experience, ExperienceSchema } from "./experience.schema"

interface ExperienceFormProps extends IFormProps {
	experience: IExperience | null
}

export default function ExperienceForm({ experience, onClose }: ExperienceFormProps) {
	const queryClient = useQueryClient()
	const submitButtonRef = useRef<HTMLButtonElement | null>(null)

	const defaultValues = {
		years: 0,
		description: "",
	}

	const form = useForm<Experience>({
		resolver: zodResolver(ExperienceSchema),
		defaultValues,
	})

	useEffect(() => {
		if (experience) {
			form.reset({
				years: experience.years,
				description: experience.description,
			})
		} else {
			form.reset(defaultValues)
		}
	}, [experience])

	const { mutate, isPending } = useMutation({
		mutationKey: ["experience"],
		mutationFn: async (data: Experience) => {
			if (experience) {
				await experienceService.update(experience.id, data)
			} else {
				await experienceService.create(data)
			}
		},
		onSuccess: () => {
			onClose()
			queryClient.invalidateQueries({ queryKey: ["experience"] })
		},
	})

	const onSubmit = (data: Experience) => {
		mutate(data)
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{experience ? "Редактировать опыт" : "Добавить опыт"}</DialogTitle>
				<DialogDescription></DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-6'
				>
					<FormField
						control={form.control}
						name='years'
						render={({ field: { onChange, value } }) => (
							<FormItem>
								<FormLabel>
									Количество лет работы<span className='text-danger'>*</span>
								</FormLabel>
								<Select
									defaultValue={value.toString()}
									onValueChange={(value) => onChange(+value)}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{Array.from({ length: 50 }, (_, i) => i + 1).map((value) => (
											<SelectItem
												key={value}
												value={value.toString()}
											>
												{value}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание</FormLabel>
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
					{experience ? "Сохранить изменения" : "Добавить запись"}
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
