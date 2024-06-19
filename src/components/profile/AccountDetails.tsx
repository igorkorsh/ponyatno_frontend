'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormField } from '@/components/ui/form-field/FormField'
import { RadioButton } from '@/components/ui/radio-button/RadioButton'

import { EnumClientGender, TypeClientProfile } from '@/types/client.types'

import { getAge } from '@/utils/getAge'
import { getGender } from '@/utils/getGender'

export function AccountDetails({ details }: { details: TypeClientProfile }) {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		age: '',
		gender: EnumClientGender.MALE,
		city: ''
	})

	const { handleSubmit, control } = useForm<TypeClientProfile>({
		defaultValues: {
			first_name: details.first_name,
			last_name: details.last_name,
			email: details.email,
			age: details.age,
			gender: details.gender,
			city: details.city
		}
	})

	const onSubmit: SubmitHandler<TypeClientProfile> = (data) => {
		setFormData(data)
		setIsEditing(false)
	}

	useEffect(() => {
		setFormData(details)
	}, [details])

	return (
		<div>
			<h2>Аккаунт</h2>
			{!isEditing && (
				<button
					type='button'
					onClick={() => setIsEditing(true)}
				>
					Редактировать
				</button>
			)}
			{isEditing ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormField
						id='first_name'
						control={control}
						label='Имя:'
						placeholder='Имя'
					/>
					<FormField
						id='last_name'
						control={control}
						label='Фамилия:'
						placeholder='Фамилия'
					/>
					<FormField
						id='email'
						control={control}
						label='Email:'
						placeholder='Email'
						type='email'
					/>
					<FormField
						id='age'
						control={control}
						label='Возраст:'
						type='date'
					/>
					<RadioButton
						id='gender'
						control={control}
						options={[
							{ label: 'Мужской', value: 'M' },
							{ label: 'Женский', value: 'F' }
						]}
					/>
					<FormField
						id='city'
						control={control}
						label='Город:'
						placeholder='Город'
					/>
					<div>
						<button type='submit'>Сохранить изменения</button>
						<button
							type='button'
							onClick={() => setIsEditing(false)}
						>
							Отмена
						</button>
					</div>
				</form>
			) : (
				<>
					<p>
						Имя: {formData.first_name} {formData.last_name}
					</p>
					<p>Email: {formData.email}</p>
					<p>Возраст: {getAge(formData.age)}</p>
					<p>Пол: {getGender(formData.gender)}</p>
					<p>Город: {formData.city}</p>
				</>
			)}
		</div>
	)
}
