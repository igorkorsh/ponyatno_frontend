import { BadgeCheck } from "lucide-react"
import { cn } from "@/utils/cn"

interface IsVerifiedProps {
	className?: string
}

export function IsVerified({ className }: IsVerifiedProps) {
	return (
		<BadgeCheck
			className={cn(
				"fill-brand-600 absolute -end-1 -bottom-1 z-1 size-10 text-neutral-100",
				className,
			)}
		/>
	)
}
