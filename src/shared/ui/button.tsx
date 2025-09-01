import { Slot } from "@radix-ui/react-slot"
import { cn } from "@utils/cn"
import { type VariantProps, cva } from "class-variance-authority"
import type { ComponentProps } from "react"

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-danger/20 aria-invalid:border-danger cursor-pointer",
	{
		variants: {
			variant: {
				default:
					"bg-accent-500 text-neutral-100 hover:bg-accent-600 focus-visible:bg-accent-700",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
				outline:
					"border bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost:
					"focus-visible:bg-brand-100 [&_svg:not([class*='size-'])]:size-6",
				input:
					"border-[1.5px] bg-transparent font-normal hover:border-brand-300 focus-visible:ring-brand-600 focus-visible:ring-[1.5px] focus-visible:ring-offset-[0.5px]",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-11 rounded-md px-4 py-3 has-[>svg]:px-4",
				icon: "size-10 rounded-full",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)

function Button({
	className,
	variant,
	size,
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
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
