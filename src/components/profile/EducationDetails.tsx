'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
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
		<Card>
			<Card.Body>
				<div
					className='d-flex flex-row align-items-center justify-content-between
				mb-3'
				>
					<Card.Title>Образование</Card.Title>
					{!isEditing && (
						<Button
							type='button'
							onClick={() => setIsEditing(true)}
						>
							Редактировать
						</Button>
					)}
				</div>
				{isEditing ? (
					<Form onSubmit={handleSubmit(onSubmit)}>
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
						<div
							className='d-flex flex-row'
							style={{ columnGap: 8 }}
						>
							<Button type='submit'>Сохранить изменения</Button>
							<Button
								variant='secondary'
								type='button'
								onClick={() => setIsEditing(false)}
							>
								Отмена
							</Button>
						</div>
					</Form>
				) : (
					<>
						<p>Тип: {formData.status_education}</p>
						<p>Где преподаю: {formData.education_place}</p>
						<p>Стаж преподавания: {formData.experience_years}</p>
						<p>Опыт: {formData.experience_text}</p>
					</>
				)}
			</Card.Body>
		</Card>
	)
}
