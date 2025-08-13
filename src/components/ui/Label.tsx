"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import type { ComponentProps } from "react"
import { cn } from "@/utils/cn"

function Label({
	className,
	...props
}: ComponentProps<typeof LabelPrimitive.Root>) {
	return (
		<LabelPrimitive.Root
			data-slot='label'
			className={cn(
				"flex items-center gap-2 text-base font-semibold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:text-neutral-400 peer-disabled:cursor-not-allowed peer-disabled:text-neutral-400",
				className,
			)}
			{...props}
		/>
	)
}

export { Label }
