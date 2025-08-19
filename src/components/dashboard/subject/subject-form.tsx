"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ISubject } from "@/types/profile.interface"
import { useSubject } from "@/hooks/useSubject"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DualRangeSlider } from "@/components/ui/dual-range-slider"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "@/components/ui/multi-select"
import { PriceInput } from "@/components/ui/price-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { GOALS, GRADES, PRICE, SUBJECTS } from "@/constants/subject.constants"
import { cn } from "@/utils/cn"
import { type SubjectFormValues, SubjectSchema } from "./subject.schema"

interface SubjectFormProps {
	data: ISubject | null
	onClose: () => void
}

export function SubjectForm({ data, onClose }: SubjectFormProps) {
	const form = useForm<SubjectFormValues>({
		resolver: zodResolver(SubjectSchema),
		defaultValues: {
			name: "RUSSIAN",
			grades: [],
			isFixedPrice: false,
			minPrice: 1000,
			maxPrice: 5000,
			goals: [],
			disabilities: false,
			isArchived: false,
		},
	})

	const isFixedPrice = form.watch("isFixedPrice")
	const minPrice = form.watch("minPrice")
	const maxPrice = form.watch("maxPrice")
	const MAX_PRICE = 20000

	const { createItem, updateItem } = useSubject()

	useEffect(() => {
		if (data) {
			form.reset({
				name: data.name,
				grades: data.grades.map((grade) => grade.toString()),
				isFixedPrice: data.isFixedPrice,
				minPrice: data.minPrice,
				maxPrice: data.maxPrice,
				goals: data.goals,
				disabilities: data.disabilities,
				isArchived: data.isArchived,
			})
		} else {
			form.reset()
		}
	}, [data, form])

	useEffect(() => {
		if (!isFixedPrice && minPrice > maxPrice) {
			form.setValue("minPrice", maxPrice)
		}
	}, [isFixedPrice, minPrice, form])

	useEffect(() => {
		if (isFixedPrice) {
			form.setValue("minPrice", maxPrice)
		} else if (maxPrice < minPrice) {
			form.setValue("maxPrice", minPrice)
		}
	}, [isFixedPrice, maxPrice, minPrice, form])

	const onSubmit = (values: SubjectFormValues) => {
		if (data?.id) {
			updateItem({ id: data.id, data: values })
		} else {
			createItem(values)
		}
		onClose?.()
	}

	return (
		<DialogContent>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-6'
				>
					<DialogHeader>
						<DialogTitle>{data ? "Редактировать предмет" : "Добавить предмет"}</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<FormField
						control={form.control}
						name='name'
						render={({ field: { onChange, value } }) => (
							<FormItem>
								<FormLabel>Название предмета</FormLabel>

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
						name='grades'
						render={({ field: { onChange, value } }) => (
							<FormItem>
								<FormLabel>Класс учеников</FormLabel>
								<MultiSelect
									values={value}
									onValuesChange={onChange}
								>
									<FormControl>
										<MultiSelectTrigger>
											<MultiSelectValue
												overflowBehavior='cutoff'
												placeholder='Выберите одну или несколько классов'
											/>
										</MultiSelectTrigger>
									</FormControl>
									<MultiSelectContent search={false}>
										<MultiSelectGroup>
											{Object.entries(GRADES).map(([value, label]) => (
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
					<div className='flex flex-col gap-4'>
						<Label>Стоимость занятия</Label>
						{!isFixedPrice && (
							<DualRangeSlider
								min={0}
								max={MAX_PRICE}
								step={1}
								value={[minPrice, maxPrice]}
								onValueChange={(value) => {
									form.setValue("minPrice", value[0])
									form.setValue("maxPrice", value[1])
								}}
							/>
						)}
						<div className={cn(!isFixedPrice && "grid grid-cols-2 gap-2")}>
							<FormField
								control={form.control}
								name='minPrice'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<PriceInput
												{...field}
												className={cn(isFixedPrice && "hidden")}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='maxPrice'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<PriceInput
												value={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='isFixedPrice'
							render={({ field: { onChange, value } }) => (
								<Label className='flex items-center gap-2 text-sm font-medium text-neutral-900'>
									<Switch
										checked={value}
										onCheckedChange={onChange}
									/>
									{value ? PRICE.FIXED : PRICE.RANGE}
								</Label>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='goals'
						render={({ field: { onChange, value } }) => (
							<FormItem>
								<FormLabel>Цели обучения</FormLabel>
								<MultiSelect
									values={value}
									onValuesChange={onChange}
								>
									<FormControl>
										<MultiSelectTrigger>
											<MultiSelectValue
												overflowBehavior='cutoff'
												placeholder='Выберите одну или несколько целей'
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
						render={({ field: { onChange, value } }) => (
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
					<DialogFooter>
						<Button
							type='submit'
							size='lg'
							className='w-full'
						>
							{data ? "Сохранить изменения" : "Добавить предмет"}
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	)
}
