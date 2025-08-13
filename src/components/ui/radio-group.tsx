"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { type ComponentProps } from "react"
import { cn } from "@/utils/cn"

function RadioGroup({
	className,
	...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) {
	return (
		<RadioGroupPrimitive.Root
			data-slot='radio-group'
			className={cn("grid gap-3", className)}
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
				"group aria-invalid:ring-danger aria-invalid:border-danger data-[state=checked]:border-brand-600 aspect-square size-5 shrink-0 rounded-full border-[1.5px] border-neutral-300 outline-none disabled:cursor-not-allowed disabled:border-neutral-200",
				className,
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator
				data-slot='radio-group-indicator'
				className='relative flex items-center justify-center'
			>
				<span className='bg-brand-600 absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full transition-transform duration-200 group-data-[state=checked]:scale-100' />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	)
}

export { RadioGroup, RadioGroupItem }
