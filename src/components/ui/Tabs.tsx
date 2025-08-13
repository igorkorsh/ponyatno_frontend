"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as React from "react"
import { cn } from "@/utils/cn"

function Tabs({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return (
		<TabsPrimitive.Root
			data-slot='tabs'
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	)
}

function TabsList({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			data-slot='tabs-list'
			className={cn(
				"inline-flex h-12 w-full items-center justify-center rounded-full bg-neutral-200 p-1 text-neutral-900",
				className,
			)}
			{...props}
		/>
	)
}

function TabsTrigger({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot='tabs-trigger'
			className={cn(
				"data-[state=active]:bg-brand-600 focus-visible:ring-brand-600 inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-base whitespace-nowrap text-neutral-900 transition-colors outline-none focus-visible:ring-[1.5px] focus-visible:ring-offset-[0.5px] disabled:pointer-events-none disabled:bg-neutral-400 data-[state=active]:font-medium data-[state=active]:text-neutral-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	)
}

function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot='tabs-content'
			className={cn("flex-1 outline-none", className)}
			{...props}
		/>
	)
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
