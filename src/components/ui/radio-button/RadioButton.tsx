'use client'

import { Form } from 'react-bootstrap'
import { Control, Controller } from 'react-hook-form'

interface IRadioOptionProps {
	id: string
	name: string
	control: Control<any>
	label: string
	value: string
}

interface IRadioButtonProps {
	id: string
	control: Control<any>
	options: Array<{ label: string; value: string }>
}

function RadioOption({ id, name, control, label, value }: IRadioOptionProps) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Form.Group className='d-flex flex-row'>
					<Form.Check
						className='pe-2'
						id={id}
						type='radio'
						{...field}
						value={value}
						checked={field.value === value}
					/>
					<Form.Label htmlFor={id}>{label}</Form.Label>
				</Form.Group>
			)}
		/>
	)
}

export function RadioButton({ id, control, options }: IRadioButtonProps) {
	return (
		<div
			className='d-flex flex-row'
			style={{ columnGap: 16 }}
		>
			{options.map((key) => (
				<RadioOption
					key={key.label}
					id={key.label}
					name={id}
					control={control}
					label={key.label}
					value={key.value}
				/>
			))}
		</div>
	)
}
