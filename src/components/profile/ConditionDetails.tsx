'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'

import { RadioButton } from '@/components/ui/radio-button/RadioButton'

import {
	EnumClientIfOnline,
	EnumClientTimeRange,
	TypeClientProfile
} from '@/types/client.types'

import { getIfOnline } from '@/utils/getIfOnline'
import { getTimeRange } from '@/utils/getTimeRange'

export function ConditionDetails({ details }: { details: TypeClientProfile }) {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		if_online: EnumClientIfOnline.NO_MATTER,
		time_range: EnumClientTimeRange.ACADEMIC_HOUR
	})

	const { handleSubmit, control } = useForm<TypeClientProfile>({
		defaultValues: {
			if_online: details.if_online,
			time_range: details.time_range
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
					<Card.Title>Условия</Card.Title>
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
							id='if_online'
							control={control}
							options={[
								{ label: 'Онлайн', value: EnumClientIfOnline.ONLINE },
								{ label: 'Оффлайн', value: EnumClientIfOnline.OFFLINE },
								{
									label: 'Не имеет значения',
									value: EnumClientIfOnline.NO_MATTER
								}
							]}
						/>
						<RadioButton
							id='time_range'
							control={control}
							options={[
								{
									label: 'Академический час (45 минут)',
									value: EnumClientTimeRange.ACADEMIC_HOUR
								},
								{
									label: 'Астрономический час (60 минут)',
									value: EnumClientTimeRange.ASTRONOMIC_HOUR
								}
							]}
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
						<p>If_online: {getIfOnline(formData.if_online)}</p>
						<p>Time_range: {getTimeRange(formData.time_range)}</p>
					</>
				)}
			</Card.Body>
		</Card>
	)
}
