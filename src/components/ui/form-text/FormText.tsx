'use client'

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
				<div>
					<textarea
						id={id}
						{...field}
					></textarea>
				</div>
			)}
		/>
	)
}
