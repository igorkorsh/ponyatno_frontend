import type { ComponentProps } from "react"
import { cn } from "@/utils/cn"

function Card({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card'
			className={cn("flex flex-col gap-4 rounded-lg bg-neutral-100 p-4 transition-all lg:rounded-xl lg:p-6", className)}
			{...props}
		/>
	)
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card-header'
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				className,
			)}
			{...props}
		/>
	)
}

function CardTitle({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card-title'
			className={cn("leading-none font-semibold", className)}
			{...props}
		/>
	)
}

function CardDescription({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card-description'
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	)
}

function CardAction({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card-action'
			className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
			{...props}
		/>
	)
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card-content'
			className={cn("flex flex-col gap-4", className)}
			{...props}
		/>
	)
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card-footer'
			className={cn("flex items-center gap-2 max-lg:flex-col", className)}
			{...props}
		/>
	)
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
