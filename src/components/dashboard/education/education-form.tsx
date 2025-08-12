"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { IEducation, IFormProps } from "@/types/dashboard.types"
import { educationService } from "@/services/education.service"
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/Select"
import { Switch } from "@/components/ui/Switch"
import { DEGREES } from "@/constants/education.constants"
import { Education, EducationSchema } from "./education.schema"

interface EducationFormProps extends IFormProps {
	education: IEducation | null
}

export default function EducationForm({
	education,
	onClose,
}: EducationFormProps) {
	const queryClient = useQueryClient()
	const [isCurrent, setIsCurrent] = useState(false)
	const submitButtonRef = useRef<HTMLButtonElement | null>(null)

	const years = useMemo((): number[] => {
		const endYear = new Date().getFullYear() + 10
		return Array.from({ length: endYear - 1899 }, (_, i) => endYear - i)
	}, [])

	const defaultValues = {
		degree: "BACHELOR",
		institution: "",
		speciality: "",
		startDate: null,
		endDate: null,
	}

	const form = useForm<Education>({
		resolver: zodResolver(EducationSchema),
		defaultValues,
	})

	useEffect(() => {
		if (education) {
			form.reset({
				degree: education.degree,
				institution: education.institution,
				speciality: education.speciality,
				startDate: education.startDate,
				endDate: education.endDate,
			})

			setIsCurrent(!education.endDate)
		} else {
			form.reset(defaultValues)
			setIsCurrent(false)
		}
	}, [education])

	const { mutate, isPending } = useMutation({
		mutationKey: ["education"],
		mutationFn: async (data: Education) => {
			if (education) {
				await educationService.update(education.id, data)
			} else {
				await educationService.create(data)
			}
		},
		onSuccess: () => {
			onClose()
			queryClient.invalidateQueries({ queryKey: ["education"] })
		},
	})

	const onSubmit = (data: Education) => {
		mutate(data)
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					{education ? "Редактировать образование" : "Добавить образование"}
				</DialogTitle>
				<DialogDescription></DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-6'
				>
					<FormField
						control={form.control}
						name='degree'
						render={({ field: { onChange, value } }) => (
							<FormItem>
								<FormLabel>
									Степень образования<span className='text-danger'>*</span>
								</FormLabel>
								<Select
									defaultValue={value}
									onValueChange={onChange}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{Object.entries(DEGREES).map(([value, label]) => (
											<SelectItem
												key={value}
												value={value.toUpperCase()}
											>
												{label}
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
						name='institution'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Учебное заведение<span className='text-danger'>*</span>
								</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='speciality'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Специальность<span className='text-danger'>*</span>
								</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='startDate'
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<FormLabel>Год начала обучения</FormLabel>
								<Select
									defaultValue={value?.toString()}
									onValueChange={(value) => onChange(+value)}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{years.map((year) => (
											<SelectItem
												key={year}
												value={year.toString()}
											>
												{year}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					{!isCurrent && (
						<FormField
							control={form.control}
							name='endDate'
							render={({ field: { value, onChange } }) => {
								const startYear = form.watch("startDate")
								const filteredYears = years.filter(
									(year) => !startYear || year >= startYear,
								)

								return (
									<FormItem>
										<FormLabel>Год окончания обучения</FormLabel>
										<Select
											defaultValue={value?.toString()}
											onValueChange={(value) => onChange(+value)}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{filteredYears.map((year) => (
													<SelectItem
														key={year}
														value={year.toString()}
													>
														{year}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					)}
					<Label className='flex items-center gap-2 text-sm font-medium text-neutral-900'>
						<Switch
							checked={isCurrent}
							onCheckedChange={(checked) => {
								setIsCurrent(checked)
								if (checked) form.setValue("endDate", null)
							}}
						/>
						Прохожу обучение в данный момент
					</Label>
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
					{education ? "Сохранить изменения" : "Добавить запись"}
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
