import type { ComponentProps } from "react"
import { cn } from "@/utils/cn"

function Input({ className, type, ...props }: ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				"file:text-foreground selection:bg-primary selection:text-primary-foreground focus-visible:ring-brand-600 aria-invalid:ring-danger/20 aria-invalid:border-danger hover:border-brand-300 flex h-11 w-full min-w-0 rounded-md border-[1.5px] border-neutral-300 bg-transparent px-4 py-2.5 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] focus-visible:border-neutral-300 focus-visible:ring-[1.5px] focus-visible:ring-offset-[0.5px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-neutral-200",
				className,
			)}
			{...props}
		/>
	)
}

export { Input }
