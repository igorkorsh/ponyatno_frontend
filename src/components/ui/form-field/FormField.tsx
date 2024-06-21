'use client'

import { Form } from 'react-bootstrap'
import { Control, Controller } from 'react-hook-form'

interface IFormFieldProps {
	id: string
	control: Control<any>
	label: string
	type?: string
	placeholder?: string
}

export function FormField({
	id,
	control,
	label,
	type,
	placeholder
}: IFormFieldProps) {
	return (
		<Controller
			name={id}
			control={control}
			render={({ field }) => (
				<Form.Group className='mb-2'>
					<Form.Label
						htmlFor={id}
						className='mb-0'
					>
						{label}
					</Form.Label>
					<Form.Control
						id={id}
						type={type}
						placeholder={placeholder}
						{...field}
					/>
				</Form.Group>
			)}
		/>
	)
}
