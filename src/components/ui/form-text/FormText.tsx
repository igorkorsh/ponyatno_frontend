'use client'

import { Form } from 'react-bootstrap'
import { Control, Controller } from 'react-hook-form'

interface IFormTextProps {
	id: string
	control: Control<any>
}

export function FormText({ id, control }: IFormTextProps) {
	return (
		<Controller
			name={id}
			control={control}
			render={({ field }) => (
				<Form.Group>
					<Form.Control
						id={id}
						as='textarea'
						{...field}
					></Form.Control>
				</Form.Group>
			)}
		/>
	)
}
