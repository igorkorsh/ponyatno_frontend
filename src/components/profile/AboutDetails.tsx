'use client'

import { useEffect, useState } from 'react'
import { Button, Card, CardBody, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EnumClientType, TypeClientProfile } from '@/types/client.types'

import { FormText } from '../ui/form-text/FormText'

export function AboutDetails({ details }: { details: TypeClientProfile }) {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		about_me: '',
		student_wish: ''
	})

	const getId = (): string => {
		switch (details.user_type) {
			case EnumClientType.STUDENT:
				return 'student_wish'
			case EnumClientType.TEACHER:
				return 'about_me'
			default:
				throw new Error(`Некорректный тип пользователя ${details.user_type}`)
		}
	}

	// FIXME: Убрать лишнюю пару "ключ-значение"
	const { handleSubmit, control } = useForm<TypeClientProfile>({
		defaultValues: {
			about_me: details.about_me,
			student_wish: details.student_wish
		}
	})

	const onSubmit: SubmitHandler<TypeClientProfile> = (data) => {
		setFormData(data)
		setIsEditing(false)
	}

	const renderText = () => {
		switch (details.user_type) {
			case EnumClientType.STUDENT:
				return <p>{formData.student_wish}</p>
			case EnumClientType.TEACHER:
				return <p>{formData.about_me}</p>
		}
	}

	const renderTitle = () => {
		switch (details.user_type) {
			case EnumClientType.STUDENT:
				return <Card.Title>Пожелания ученика</Card.Title>
			case EnumClientType.TEACHER:
				return <Card.Title>Обо мне</Card.Title>
		}
	}

	useEffect(() => {
		setFormData(details)
	}, [details])

	return (
		<Card>
			<Card.Body>
				<div className='d-flex flex-row align-items-center justify-content-between mb-3'>
					{renderTitle()}
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
					<Form
						onSubmit={handleSubmit(onSubmit)}
						className='d-flex flex-column'
						style={{ rowGap: 8 }}
					>
						<FormText
							id={getId()}
							control={control}
						/>
						<div
							className='d-flex flex-row'
							style={{ columnGap: 8 }}
						>
							<Button type='submit'>Сохранить изменения</Button>
							<Button
								type='button'
								variant='secondary'
								onClick={() => setIsEditing(false)}
							>
								Отмена
							</Button>
						</div>
					</Form>
				) : (
					renderText()
				)}
			</Card.Body>
		</Card>
	)
}
