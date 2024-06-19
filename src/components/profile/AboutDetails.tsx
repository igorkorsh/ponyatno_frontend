'use client'

import { useEffect, useState } from 'react'
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
				return <h2>Пожелания ученика</h2>
			case EnumClientType.TEACHER:
				return <h2>Обо мне</h2>
		}
	}

	useEffect(() => {
		setFormData(details)
	}, [details])

	return (
		<div>
			{renderTitle()}
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
					<FormText
						id={getId()}
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
				renderText()
			)}
		</div>
	)
}
