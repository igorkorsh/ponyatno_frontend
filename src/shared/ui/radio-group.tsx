"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"
import type { ComponentProps } from "react"
import { cn } from "@utils/cn"

function RadioGroup({
	className,
	...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) {
	return (
		<RadioGroupPrimitive.Root
			data-slot='radio-group'
			className={cn("grid gap-2", className)}
			{...props}
		/>
	)
}

function RadioGroupItem({
	className,
	...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) {
	return (
		<RadioGroupPrimitive.Item
			data-slot='radio-group-item'
			className={cn(
				"aria-invalid:border-danger hover:border-brand-300 data-[state=checked]:border-brand-600 hover:data-[state=checked]:border-brand-700 aspect-square size-5 shrink-0 rounded-full border-[1.5px] border-neutral-300 text-neutral-900 transition-colors outline-none disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-200",
				className,
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator
				data-slot='radio-group-indicator'
				className='group relative flex items-center justify-center'
			>
				<CircleIcon className='group-data-[state=checked]:text-brand-600 absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 fill-current text-neutral-100 group-disabled:text-neutral-200' />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	)
}

export { RadioGroup, RadioGroupItem }
