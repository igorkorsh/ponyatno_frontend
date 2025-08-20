import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { Button } from "@ui/button"
import { Calendar } from "@ui/calendar"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/form"
import { Input } from "@ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover"
import { RadioGroup, RadioGroupItem } from "@ui/radio-group"
import { GENDER } from "../constants/account.constants"
import { useCurrentProfile } from "../hooks/useCurrentProfile"
import {
	type AccountFormValues,
	accountSchema,
} from "../schemas/account.schema"

export function AccountForm({ onClose }: { onClose: () => void }) {
	const { data, update, isPending } = useCurrentProfile()

	if (!data) return null

	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountSchema),
		values: {
			firstName: data.firstName,
			lastName: data.lastName,
			gender: data.gender,
			birthDate: data.birthDate,
		},
	})

	const onSubmit = (data: AccountFormValues) => {
		update(data)
		onClose?.()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-4 lg:gap-6'
			>
				<FormField
					control={form.control}
					name='firstName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{data.role === "TEACHER" ? "Имя и отчество" : "Имя"}
								<span className='text-danger'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder={
										data.role === "TEACHER" ? "Виктор Викторович" : "Виктор"
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{data.role === "TEACHER" && (
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
										{...field}
										placeholder='Викторов'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<FormField
					control={form.control}
					name='gender'
					render={({ field: { onChange, value } }) => (
						<FormItem>
							<FormLabel>
								Пол<span className='text-danger'>*</span>
							</FormLabel>
							<FormControl>
								<RadioGroup
									value={value}
									onValueChange={onChange}
									className='flex gap-6'
								>
									{Object.entries(GENDER).map(([value, label]) => (
										<FormItem
											key={value}
											className='flex items-center'
										>
											<FormControl>
												<RadioGroupItem value={value} />
											</FormControl>
											<FormLabel className='font-normal'>{label}</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
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
											variant='input'
											size='lg'
											className='justify-start'
										>
											{value ? (
												format(value, "dd MMMM yyyy", { locale: ru })
											) : (
												<span className='text-neutral-600'>Выберите дату</span>
											)}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent>
									<Calendar
										mode='single'
										captionLayout='dropdown'
										showOutsideDays={false}
										selected={value}
										defaultMonth={value}
										disabled={(date) => date > new Date()}
										onSelect={(value) => onChange(value)}
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					size='lg'
					type='submit'
					disabled={isPending}
				>
					Сохранить изменения
				</Button>
			</form>
		</Form>
	)
}
