'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormField } from '@/components/ui/form-field/FormField'
import { RadioButton } from '@/components/ui/radio-button/RadioButton'

import {
	EnumClientStatusEducation,
	TypeClientProfile
} from '@/types/client.types'

import { FormText } from '../ui/form-text/FormText'

export function EducationDetails({ details }: { details: TypeClientProfile }) {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		status_education: EnumClientStatusEducation.BACHELOR,
		education_place: '',
		experience_years: 0,
		experience_text: ''
	})

	const { handleSubmit, control } = useForm<TypeClientProfile>({
		defaultValues: {
			status_education: EnumClientStatusEducation.BACHELOR,
			education_place: details.education_place,
			experience_years: details.experience_years,
			experience_text: details.experience_text
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
			<h2>Образование</h2>
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
					<RadioButton
						id='status_education'
						control={control}
						options={[
							{
								label: 'Бакалавриат',
								value: EnumClientStatusEducation.BACHELOR
							},
							{
								label: 'Магистратура',
								value: EnumClientStatusEducation.MAGISTER
							},
							{
								label: 'Специалист',
								value: EnumClientStatusEducation.SPECIALITY
							},
							{
								label: 'Ученая степень',
								value: EnumClientStatusEducation.ACADEMIC_DEGREE
							},
							{ label: 'Студент', value: EnumClientStatusEducation.STUDENT }
						]}
					/>
					<FormField
						id='education_place'
						control={control}
						label='Где преподаю:'
						placeholder='Где преподаю'
					/>
					<FormField
						id='experience_years'
						control={control}
						label='Стаж преподавания:'
						placeholder='Стаж преподавания'
						type='number'
					/>
					<FormText
						id='experience_text'
						control={control}
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
					<p>Тип: {formData.status_education}</p>
					<p>Где преподаю: {formData.education_place}</p>
					<p>Стаж преподавания: {formData.experience_years}</p>
					<p>Опыт: {formData.experience_text}</p>
				</>
			)}
		</div>
	)
}
