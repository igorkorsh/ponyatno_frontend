"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { VariantProps, cva } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/utils/cn"

const avatarVariants = cva("relative flex shrink-0 rounded-full", {
	variants: {
		size: {
			sm: "size-10",
			md: "size-[61px]",
			lg: "size-[122px]",
		},
	},
	defaultVariants: {
		size: "md",
	},
})

const avatarFallbackVariants = cva(
	"flex size-full items-center justify-center rounded-full bg-neutral-200 text-brand-600 font-semibold select-none",
	{
		variants: {
			size: {
				sm: "text-[22px]",
				md: "text-2xl",
				lg: "text-[80px] leading-[120px]",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
)

function Avatar({
	className,
	size,
	...props
}: ComponentProps<typeof AvatarPrimitive.Root> &
	VariantProps<typeof avatarVariants>) {
	return (
		<AvatarPrimitive.Root
			data-slot='avatar'
			className={cn(avatarVariants({ size, className }))}
			{...props}
		/>
	)
}

function AvatarImage({
	className,
	...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
	return (
		<AvatarPrimitive.Image
			data-slot='avatar-image'
			className={cn("aspect-square size-full", className)}
			{...props}
		/>
	)
}

function AvatarFallback({
	className,
	size,
	...props
}: ComponentProps<typeof AvatarPrimitive.Fallback> &
	VariantProps<typeof avatarFallbackVariants>) {
	return (
		<AvatarPrimitive.Fallback
			data-slot='avatar-fallback'
			className={cn(avatarFallbackVariants({ size, className }))}
			{...props}
		/>
	)
}

export { Avatar, AvatarImage, AvatarFallback }
