'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormField } from '@/components/ui/form-field/FormField'
import { RadioButton } from '@/components/ui/radio-button/RadioButton'

import { EnumClientPriceIfRange, TypeClientProfile } from '@/types/client.types'

export function PriceDetails({ details }: { details: TypeClientProfile }) {
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		price_if_range: EnumClientPriceIfRange.DIGIT,
		price_digit: 0,
		price_from: 0,
		price_to: 0
	})

	const { handleSubmit, control, watch } = useForm<TypeClientProfile>({
		defaultValues: {
			price_if_range: EnumClientPriceIfRange.DIGIT,
			price_digit: details.price_digit,
			price_from: details.price_from,
			price_to: details.price_to
		}
	})

	const onSubmit: SubmitHandler<TypeClientProfile> = (data) => {
		setFormData(data)
		setIsEditing(false)
	}

	const renderComponent = () => {
		switch (watch('price_if_range')) {
			case EnumClientPriceIfRange.DIGIT:
				return (
					<FormField
						id='price_digit'
						control={control}
						label='Стоимость занятия:'
						placeholder='Стоимость занятия'
						type='number'
					/>
				)
			case EnumClientPriceIfRange.RANGE:
				return (
					<>
						<FormField
							id='price_from'
							control={control}
							label='Диапазон (от):'
							placeholder='Диапазон (от)'
							type='number'
						/>
						<FormField
							id='price_to'
							control={control}
							label='Диапазон (до):'
							placeholder='Диапазон (до)'
							type='number'
						/>
					</>
				)
		}
	}

	const renderText = () => {
		switch (formData.price_if_range) {
			case EnumClientPriceIfRange.DIGIT:
				return <p>Стоимость (digit): {formData.price_digit}</p>
			case EnumClientPriceIfRange.RANGE:
				return (
					<>
						<p>Диапазон (price_from): {formData.price_from}</p>
						<p>Диапазон (price_to): {formData.price_to}</p>
					</>
				)
		}
	}

	useEffect(() => {
		setFormData(details)
	}, [details])

	return (
		<div>
			<h2>Стоимость</h2>
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
						id='price_if_range'
						control={control}
						options={[
							{ label: 'digit', value: 'digit' },
							{ label: 'range', value: 'range' }
						]}
					/>
					{renderComponent()}
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
					<p>Тип: {formData.price_if_range}</p>
					{renderText()}
				</>
			)}
		</div>
	)
}
