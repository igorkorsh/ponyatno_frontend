import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { type ComponentProps } from "react"
import { cn } from "@/utils/cn"

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-xs border w-fit whitespace-nowrap shrink-0 [&>svg]:size-4 gap-1 [&>svg]:pointer-events-none outline-none aria-invalid:ring-danger/20  aria-invalid:border-danger transition-colors overflow-hidden",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
				secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
				destructive: "border-transparent bg-danger text-white [a&]:hover:bg-danger/90 focus-visible:ring-danger/20",
				outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
				light: "border-transparent bg-brand-100 text-neutral-800 hover:text-brand-600",
			},
			size: {
				default: "p-2 text-base font-medium",
				sm: "px-2 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "sm",
		},
	},
)

function Badge({ className, variant, asChild = false, ...props }: ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span"

	return (
		<Comp
			data-slot='badge'
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	)
}

export { Badge, badgeVariants }
