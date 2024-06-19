'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormField } from '@/components/ui/form-field/FormField'

import { EnumClientGrade, TypeClientProfile } from '@/types/client.types'

export function SubjectDetails({ details }: { details: TypeClientProfile }) {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		subject: [{ id: '', name: '' }],
		grade: EnumClientGrade.GRADUATED
	})

	const { handleSubmit, control } = useForm<TypeClientProfile>({
		defaultValues: {
			subject: [{ id: '', name: '' }],
			grade: EnumClientGrade.GRADUATED
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
			<h2>Предметы</h2>
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
						id='subject'
						control={control}
						label='Предметы:'
						placeholder='Предметы'
					/>
					<FormField
						id='grade'
						control={control}
						label='grade:'
						placeholder='grade'
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
						Предметы:
						{formData.subject.map((subject) => (
							<div key={subject.id}>{subject.name}</div>
						))}
					</p>
					<p>Образование: {formData.grade}</p>
				</>
			)}
		</div>
	)
}
