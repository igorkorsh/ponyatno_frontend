import type { ChangeEvent, ComponentProps } from "react"
import { Input } from "@/components/ui/input"

interface PriceInputProps {
	value: number
	onChange: (value: number) => void
}

function PriceInput({ value, onChange, ...props }: ComponentProps<"input"> & PriceInputProps) {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "")
		const valueAsNumber = +value || 0
		onChange(valueAsNumber)
	}

	return (
		<Input
			autoComplete='off'
			inputMode='numeric'
			maxLength={5}
			value={value}
			onChange={handleInputChange}
			{...props}
		/>
	)
}

export { PriceInput }
