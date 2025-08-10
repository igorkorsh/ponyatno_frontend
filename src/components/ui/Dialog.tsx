"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import type { ComponentProps } from "react"
import { cn } from "@/utils/cn"

function Dialog({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
	return (
		<DialogPrimitive.Root
			data-slot='dialog'
			{...props}
		/>
	)
}

function DialogTrigger({
	...props
}: ComponentProps<typeof DialogPrimitive.Trigger>) {
	return (
		<DialogPrimitive.Trigger
			data-slot='dialog-trigger'
			{...props}
		/>
	)
}

function DialogPortal({
	...props
}: ComponentProps<typeof DialogPrimitive.Portal>) {
	return (
		<DialogPrimitive.Portal
			data-slot='dialog-portal'
			{...props}
		/>
	)
}

function DialogClose({
	...props
}: ComponentProps<typeof DialogPrimitive.Close>) {
	return (
		<DialogPrimitive.Close
			data-slot='dialog-close'
			{...props}
		/>
	)
}

function DialogOverlay({
	className,
	...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot='dialog-overlay'
			className={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-neutral-900/60",
				className,
			)}
			{...props}
		/>
	)
}

function DialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
	showCloseButton?: boolean
}) {
	return (
		<DialogPortal data-slot='dialog-portal'>
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot='dialog-content'
				className={cn(
					"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 shadow-base fixed left-1/2 z-50 grid w-full -translate-x-1/2 gap-4 rounded-tl-lg rounded-tr-lg p-4 duration-200 max-md:bottom-0 md:top-1/2 md:max-w-[505px] md:-translate-y-1/2 md:rounded-xl md:p-6",
					className,
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot='dialog-close'
						className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none md:top-6 md:right-6 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6"
					>
						<XIcon />
						<span className='sr-only'>Закрыть</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	)
}

function DialogHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='dialog-header'
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	)
}

function DialogFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot='dialog-footer'
			className={cn("flex flex-col-reverse gap-2 sm:flex-row", className)}
			{...props}
		/>
	)
}

function DialogTitle({
	className,
	...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot='dialog-title'
			className={cn("text-lg font-semibold", className)}
			{...props}
		/>
	)
}

function DialogDescription({
	className,
	...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot='dialog-description'
			className={cn("text-sm text-neutral-600", className)}
			{...props}
		/>
	)
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
}
