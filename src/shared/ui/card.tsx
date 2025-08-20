import { cn } from "@utils/cn"
import type { ComponentProps } from "react"

function Card({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card'
			className={cn(
				"flex flex-col rounded-lg border border-neutral-300 bg-neutral-100 p-4 text-neutral-900 lg:rounded-xl lg:p-6",
				className,
			)}
			{...props}
		/>
	)
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card-header'
			className={cn(
				"@container/card-header grid h-0 auto-rows-min items-start gap-3 has-data-[card-description]:grid-rows-[auto_auto] has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-title]:h-auto",
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
			className={cn("text-lg font-semibold", className)}
			{...props}
		/>
	)
}

function CardDescription({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card-description'
			className={cn("text-sm text-neutral-600", className)}
			{...props}
		/>
	)
}

function CardAction({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card-action'
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	)
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card-content'
			className={className}
			{...props}
		/>
	)
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='card-footer'
			className={cn("flex items-center justify-center", className)}
			{...props}
		/>
	)
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
}
