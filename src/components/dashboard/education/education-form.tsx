"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import { useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { IEducation } from "@/types/profile.types"
import { useEducation } from "@/hooks/useEducation"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DEGREES } from "@/constants/education.constants"
import { getYears } from "@/utils/years"
import { type EducationFormValues, EducationSchema } from "./education.schema"

interface EducationFormProps {
	data: IEducation | null
	onClose: () => void
}

export function EducationForm({ data, onClose }: EducationFormProps) {
	const [itemId, setItemId] = useState<string | null>(null)
	const [isEndDate, setIsEndDate] = useState(false)
	const submitButtonRef = useRef<HTMLButtonElement | null>(null)
	const years = useMemo(() => getYears(10), [])

	const defaultValues = {
		degree: "BACHELOR",
		institution: "",
		speciality: "",
		startDate: null,
		endDate: null,
	}

	const form = useForm<EducationFormValues>({
		resolver: zodResolver(EducationSchema),
		defaultValues,
	})

	const { createItem, updateItem } = useEducation()

	useEffect(() => {
		if (data) {
			setItemId(data.id)
			form.reset({
				degree: data.degree,
				institution: data.institution,
				speciality: data.speciality,
				startDate: data.startDate,
				endDate: data.endDate,
			})
		} else {
			form.reset(defaultValues)
			setItemId(null)
		}
	}, [data, form])

	const onSubmit = (data: EducationFormValues) => {
		if (itemId) {
			updateItem({ id: itemId, data })
		} else {
			createItem(data)
		}
		onClose?.()
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{data ? "Редактировать образование" : "Добавить образование"}</DialogTitle>
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
								<FormLabel>Степень образования</FormLabel>
								<Select
									value={value}
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
								<FormLabel className='gap-1'>
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
								<FormLabel className='gap-1'>
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
						render={({ field: { onChange, value } }) => (
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
					{!isEndDate && (
						<FormField
							control={form.control}
							name='endDate'
							render={({ field: { onChange, value } }) => {
								const startYear = form.watch("startDate")
								const filteredYears = years.filter((year) => !startYear || year >= startYear)

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
							checked={isEndDate}
							onCheckedChange={(checked) => {
								setIsEndDate(checked)
								if (checked) {
									form.setValue("endDate", null)
								}
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
					size='lg'
					onClick={() => submitButtonRef.current?.click()}
				>
					{data ? "Сохранить изменения" : "Добавить запись"}
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
