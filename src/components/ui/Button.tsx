import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/utils/cn"

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold transition-colors disabled:pointer-events-none disabled:bg-neutral-200 disabled:text-neutral-400 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-danger/20 aria-invalid:border-danger cursor-pointer",
	{
		variants: {
			variant: {
				default:
					"bg-accent-500 text-neutral-100 hover:bg-accent-600 focus:bg-accent-700 h-11 px-8 py-3",
				secondary:
					"bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:bg-neutral-300 h-11 px-8 py-3",
				tertiary:
					"bg-transparent text-neutral-900 hover:bg-neutral-300 focus:bg-neutral-300",
				// destructive:
				// 	"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				// outline:
				// 	"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				link: "text-primary underline-offset-4 hover:underline",
				icon: "rounded-full focus-visible:bg-brand-100 text-brand-600 hover:text-brand-700",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

function Button({
	className,
	variant,
	asChild = false,
	...props
}: ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot : "button"

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
