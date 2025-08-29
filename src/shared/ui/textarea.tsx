import { cn } from "@utils/cn"
import type { ComponentProps } from "react"

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot='textarea'
			className={cn(
				"aria-invalid:ring-danger/20 aria-invalid:border-danger focus-visible:ring-brand-600 hover:border-brand-300 flex field-sizing-content min-h-32 w-full resize-none rounded-md border-[1.5px] border-neutral-300 bg-transparent px-4 py-3 text-base transition-colors outline-none placeholder:text-neutral-600 focus-visible:ring-[1.5px] focus-visible:ring-offset-[0.5px] disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-200",
				className,
			)}
			{...props}
		/>
	)
}

export { Textarea }
