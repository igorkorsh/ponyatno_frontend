import { Slot } from "@radix-ui/react-slot"
import { cn } from "@utils/cn"
import { type VariantProps, cva } from "class-variance-authority"
import type { ComponentProps } from "react"

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-sm border font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-4 gap-2 [&>svg]:pointer-events-none outline-none aria-invalid:ring-danger/20 aria-invalid:border-danger transition-colors overflow-hidden",
	{
		variants: {
			variant: {
				default: "border-neutral-300 text-neutral-900 hover:bg-neutral-300 ",
				secondary: "border-transparent bg-brand-100 text-neutral-800",
				destructive:
					"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
			},
			size: {
				sm: "h-6.5 px-2 py-1 text-sm",
				md: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "sm",
		},
	},
)

function Badge({
	className,
	variant,
	size,
	asChild = false,
	...props
}: ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span"

	return (
		<Comp
			data-slot='badge'
			className={cn(badgeVariants({ variant, size }), className)}
			{...props}
		/>
	)
}

export { Badge, badgeVariants }
