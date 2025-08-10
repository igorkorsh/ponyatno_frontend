import { type ComponentProps } from "react"
import { cn } from "@/utils/cn"

function Skeleton({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='skeleton'
			className={cn("bg-brand-100 animate-pulse rounded-md", className)}
			{...props}
		/>
	)
}

export { Skeleton }
