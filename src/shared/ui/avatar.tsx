"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@utils/cn"
import { type VariantProps, cva } from "class-variance-authority"
import type { ComponentProps } from "react"

const avatarVariants = cva(
	"relative flex shrink-0 overflow-hidden rounded-full",
	{
		variants: {
			size: {
				default: "size-[61px] has-[>span]:text-2xl",
				sm: "size-10 has-[>span]:text-[22px]",
				lg: "size-[122px] has-[>span]:text-[80px]",
			},
		},
		defaultVariants: {
			size: "default",
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
	...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
	return (
		<AvatarPrimitive.Fallback
			data-slot='avatar-fallback'
			className={cn(
				"text-brand-600 flex size-full items-center justify-center rounded-full bg-neutral-200 font-semibold uppercase select-none",
				className,
			)}
			{...props}
		/>
	)
}

export { Avatar, AvatarImage, AvatarFallback }
