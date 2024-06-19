'use client'

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
				<div>
					<label htmlFor={id}>{label}</label>
					<input
						id={id}
						type={type}
						placeholder={placeholder}
						{...field}
					/>
				</div>
			)}
		/>
	)
}
