import type { ComponentProps } from "react"
import { cn } from "@utils/cn"

function Input({ className, type, ...props }: ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				"file:text-foreground selection:bg-brand-100 hover:border-brand-300 flex h-11 w-full min-w-0 rounded-md border-[1.5px] bg-transparent px-4 py-3 text-base transition-colors outline-none selection:text-neutral-900 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-600 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-neutral-200",
				"focus-visible:ring-brand-600 focus-visible:ring-[1.5px] focus-visible:ring-offset-[0.5px]",
				"aria-invalid:ring-danger/20 aria-invalid:border-danger",
				className,
			)}
			{...props}
		/>
	)
}

export { Input }
