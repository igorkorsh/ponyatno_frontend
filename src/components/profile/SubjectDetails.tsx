'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
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
		<Card>
			<Card.Body>
				<div
					className='d-flex flex-row align-items-center justify-content-between
				mb-3'
				>
					<Card.Title>Предметы</Card.Title>
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
						<p>
							Предметы:
							{formData.subject.map((subject) => (
								<div key={subject.id}>{subject.name}</div>
							))}
						</p>
						<p>Образование: {formData.grade}</p>
					</>
				)}
			</Card.Body>
		</Card>
	)
}
