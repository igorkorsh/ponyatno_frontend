import { type ComponentProps, useState } from "react"
import { cn } from "@/utils/cn"

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
	return (
		<>
			<textarea
				data-slot='textarea'
				className={cn(
					"focus-visible:border-ring focus-visible:ring-brand-600 aria-invalid:ring-destructive/20 aria-invalid:border-danger flex field-sizing-content min-h-30 w-full rounded-md border-[1.5px] border-neutral-300 bg-transparent px-4 py-2.5 text-base transition-colors outline-none placeholder:text-neutral-400 focus-visible:ring-[1.5px] focus-visible:ring-offset-[0.5px] disabled:cursor-not-allowed disabled:border-neutral-200",
					className,
				)}
				{...props}
			/>
		</>
	)
}
export { Textarea }
