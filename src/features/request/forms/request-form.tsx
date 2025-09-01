import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { GOAL_ITEMS } from "@/shared/constants/goal.constants"
import { GRADE_ITEMS } from "@/shared/constants/grade.constants"
import {
	SUBJECT_ITEMS,
	SUBJECT_LIMITS,
	type Subject,
} from "@/shared/constants/subject.constants"
import { useDialogContext } from "@/shared/providers/dialog.provider"
import { Button } from "@/shared/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/ui/form"
import {
	MultiSelect,
	MultiSelectContent,
	MultiSelectGroup,
	MultiSelectItem,
	MultiSelectTrigger,
	MultiSelectValue,
} from "@/shared/ui/multi-select"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/select"
import { Textarea } from "@/shared/ui/textarea"
import { useRequest } from "../hooks/useRequest"
import { IRequest } from "../interfaces/request.interface"
import {
	type RequestFormValues,
	requestSchema,
} from "../schemas/request.schema"

export function RequestForm({ data }: { data: IRequest | null }) {
	const { onClose } = useDialogContext()
	const { createItem, updateItem, isPending } = useRequest()

	const { id, subject, grade, goals, comment } = data ?? {
		subject: "",
		grade: -1,
		goals: [],
		comment: "",
	}

	const form = useForm<RequestFormValues>({
		resolver: zodResolver(requestSchema),
		defaultValues: {
			subject,
			grade,
			goals,
			comment,
		},
	})

	const watchedSubject = form.watch("subject")
	const availableGrades = watchedSubject
		? SUBJECT_LIMITS[watchedSubject as Subject]
		: []
	const filteredGrades = GRADE_ITEMS.filter(({ value }) =>
		availableGrades.includes(+value),
	)

	const onSubmit = (data: RequestFormValues) => {
		if (id) {
			updateItem(
				{ id, data },
				{
					onSuccess: () => {
						onClose?.()
					},
				},
			)
		} else {
			createItem(data, {
				onSuccess: () => {
					onClose?.()
				},
			})
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4 lg:gap-6'
			>
				<FormField
					control={form.control}
					name='subject'
					render={({ field: { onChange, value } }) => (
						<FormItem>
							<FormLabel>
								Предмет <span className='text-danger'>*</span>
							</FormLabel>
							<FormControl>
								<Select
									defaultValue={value}
									onValueChange={onChange}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Выберите предмет' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{SUBJECT_ITEMS.map(({ value, label }) => (
											<SelectItem
												key={value}
												value={value}
											>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{watchedSubject && (
					<div className='animate-in slide-in-from-top-2 ease-out'>
						<FormField
							control={form.control}
							name='grade'
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>
										Класс <span className='text-danger'>*</span>
									</FormLabel>
									<Select
										defaultValue={value?.toString() || ""}
										onValueChange={(value) => onChange(+value)}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Выберите класс' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{filteredGrades.map(({ value, label }) => (
												<SelectItem
													key={value}
													value={value.toString()}
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
					</div>
				)}
				<FormField
					control={form.control}
					name='goals'
					defaultValue={[]}
					render={({ field: { onChange, value } }) => (
						<FormItem>
							<FormLabel>Цель занятий</FormLabel>
							<MultiSelect
								values={value}
								onValuesChange={onChange}
							>
								<FormControl>
									<MultiSelectTrigger>
										<MultiSelectValue
											overflowBehavior='cutoff'
											placeholder='Выберите цель'
										/>
									</MultiSelectTrigger>
								</FormControl>
								<MultiSelectContent search={false}>
									<MultiSelectGroup>
										{GOAL_ITEMS.map(({ value, label }) => (
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='comment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Дополнительная информация</FormLabel>
							<FormControl>
								<Textarea {...field} />
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
					{data ? "Сохранить изменения" : "Создать заявку"}
				</Button>
			</form>
		</Form>
	)
}
