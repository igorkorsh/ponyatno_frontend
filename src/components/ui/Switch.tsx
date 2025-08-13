"use client"

import * as SwitchPrimitive from "@radix-ui/react-switch"
import type { ComponentProps } from "react"
import { cn } from "@/utils/cn"

function Switch({
	className,
	...props
}: ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			data-slot='switch'
			className={cn(
				"peer data-[state=checked]:bg-brand-600 focus-visible:ring-brand-600 inline-flex h-6 w-10.5 shrink-0 cursor-pointer items-center rounded-full border-none transition-all outline-none focus-visible:ring-[1.5px] focus-visible:ring-offset-[0.5px] disabled:cursor-not-allowed disabled:bg-neutral-200 data-[state=unchecked]:bg-neutral-300",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot='switch-thumb'
				className={cn(
					"pointer-events-none block size-4.5 rounded-full bg-neutral-100 ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%+3px)] data-[state=unchecked]:translate-x-0.75",
				)}
			/>
		</SwitchPrimitive.Root>
	)
}

export { Switch }
