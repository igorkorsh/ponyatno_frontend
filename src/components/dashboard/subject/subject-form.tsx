"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { IFormProps, ISubject } from "@/types/dashboard.types"
import { subjectService } from "@/services/subject.service"
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
import { Label } from "@/components/ui/Label"
import {
	MultiSelect,
	MultiSelectContent,
	MultiSelectGroup,
	MultiSelectItem,
	MultiSelectTrigger,
	MultiSelectValue,
} from "@/components/ui/MultiSelect"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/Select"
import { Switch } from "@/components/ui/Switch"
import { GOALS, SUBJECTS } from "@/constants/subject.constants"
import { Subject, SubjectSchema } from "./subject.schema"

interface SubjectFormProps extends IFormProps {
	subject: ISubject | null
}

export default function SubjectForm({ subject, onClose }: SubjectFormProps) {
	const queryClient = useQueryClient()
	const submitButtonRef = useRef<HTMLButtonElement | null>(null)

	const defaultValues = {
		name: "RUSSIAN",
		goals: [],
		disabilities: false,
	}

	const form = useForm<Subject>({
		resolver: zodResolver(SubjectSchema),
		defaultValues,
	})

	useEffect(() => {
		if (subject) {
			form.reset({
				name: subject.name,
				goals: subject.goals,
				disabilities: subject.disabilities,
			})
		} else {
			form.reset(defaultValues)
		}
	}, [subject])

	const { mutate, isPending } = useMutation({
		mutationKey: ["subject"],
		mutationFn: async (data: Subject) => {
			if (subject) {
				await subjectService.update(subject.id, data as ISubject)
			} else {
				await subjectService.create(data as ISubject)
			}
		},
		onSuccess: () => {
			onClose()
			queryClient.invalidateQueries({ queryKey: ["subject"] })
		},
	})

	const onSubmit = (data: Subject) => {
		mutate(data)
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					{subject ? "Редактировать предмет" : "Добавить предмет"}
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
						name='name'
						render={({ field: { onChange, value } }) => (
							<FormItem>
								<FormLabel>
									Название предмета<span className='text-danger'>*</span>
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
										{Object.entries(SUBJECTS).map(([value, label]) => (
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
						name='goals'
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<FormLabel>Цели</FormLabel>
								<MultiSelect
									values={value}
									onValuesChange={onChange}
								>
									<FormControl>
										<MultiSelectTrigger>
											<MultiSelectValue
												overflowBehavior='cutoff'
												placeholder='Укажите цели обучения'
											/>
										</MultiSelectTrigger>
									</FormControl>
									<MultiSelectContent search={false}>
										<MultiSelectGroup>
											{Object.entries(GOALS).map(([value, label]) => (
												<MultiSelectItem
													key={value}
													value={value}
												>
													{label}
												</MultiSelectItem>
											))}
										</MultiSelectGroup>
									</MultiSelectContent>
								</MultiSelect>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='disabilities'
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<Label className='flex items-center gap-2 text-sm font-medium text-neutral-900'>
									<Switch
										checked={value}
										onCheckedChange={onChange}
									/>
									Работаю с детьми с ОВЗ
								</Label>
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
					{subject ? "Сохранить изменения" : "Добавить запись"}
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
