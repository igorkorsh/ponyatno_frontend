"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { ru } from "date-fns/locale/ru"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { IStudent, ITeacher } from "@/types/profile.types"
import { profileService } from "@/services/profile.service"
import { FormWrapper } from "@/components/common/form-wrapper"
import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/Calendar"
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
import { Label } from "@/components/ui/Label"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/Popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { Switch } from "@/components/ui/Switch"
import { type Account, AccountSchema } from "./account.schema"

interface AccountFormProps {
	data: ITeacher | IStudent
	onClose: () => void
}

export function AccountForm({ data, onClose }: AccountFormProps) {
	const queryClient = useQueryClient()
	const submitButtonRef = useRef<HTMLButtonElement | null>(null)

	const form = useForm({
		resolver: zodResolver(AccountSchema),
		defaultValues: {
			firstName: data.firstName || "",
			lastName: (data as ITeacher).lastName || "",
			birthDate: data.birthDate || "",
			gender: data.gender || undefined,
			isActive: (data as ITeacher).isActive || true,
		},
	})

	const { mutate } = useMutation({
		mutationKey: ["profile"],
		mutationFn: async (data: Partial<Account>) => {
			await profileService.updateMyProfile(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["profile"] })
			onClose?.()
		},
	})

	const onSubmit = (data: Partial<Account>) => {
		mutate(data)
	}

	return (
		<FormWrapper
			title='Редактировать личные данные'
			buttonText='Сохранить изменения'
			onSubmit={() => submitButtonRef.current?.click()}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid gap-6'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='gap-1'>
										Имя<span className='text-danger'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder='Иван Иванович'
											{...field}
										/>
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
										<Input
											placeholder='Иванов'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='birthDate'
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Дата рождения</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													size='lg'
													className='justify-start text-base font-normal'
												>
													{value ? (
														format(value, "dd MMMM yyyy", { locale: ru })
													) : (
														<span className='text-neutral-400'>
															Выберите дату
														</span>
													)}
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent>
											<Calendar
												mode='single'
												captionLayout='dropdown'
												endMonth={new Date()}
												selected={value ? new Date(value) : undefined}
												disabled={(date) => date > new Date()}
												onSelect={(value) => {
													if (value) {
														onChange(format(value, "yyyy-MM-dd"))
													}
												}}
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='gender'
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel className='gap-1'>
										Пол<span className='text-danger'>*</span>
									</FormLabel>
									<FormControl>
										<RadioGroup
											defaultValue={value?.toString()}
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
						<FormField
							control={form.control}
							name='isActive'
							render={({ field: { value, onChange } }) => (
								<FormItem>
									<FormLabel>Показывать мой профиль в поиске</FormLabel>
									<Label className='flex items-center gap-2 text-sm font-medium text-neutral-900'>
										<Switch
											checked={value}
											onCheckedChange={onChange}
										/>
										{value ? "Да" : "Нет"}
									</Label>
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
