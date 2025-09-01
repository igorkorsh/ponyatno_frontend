"use client"

import { Plus } from "lucide-react"
import { type PropsWithChildren } from "react"
import { DialogProvider } from "@/shared/providers/dialog.provider"
import { Button } from "@/shared/ui/button"
import {
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
	Card as Root,
} from "@/shared/ui/card"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/ui/dialog"

type CardProps = {
	title: string
	dialog: {
		title: string
		element: React.ReactNode
		isOpen: boolean
		setIsOpen: (isOpen: boolean) => void
	}
}

export function Card({
	children,
	title,
	dialog,
}: PropsWithChildren<CardProps>) {
	const { isOpen, setIsOpen } = dialog

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<Root>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardAction>
					<Dialog
						open={isOpen}
						onOpenChange={setIsOpen}
					>
						<DialogTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='text-brand-600 hover:text-brand-700 translate-x-2 -translate-y-2'
							>
								<Plus />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>{dialog.title}</DialogTitle>
							</DialogHeader>
							<DialogProvider onClose={handleClose}>
								{dialog.element}
							</DialogProvider>
						</DialogContent>
					</Dialog>
				</CardAction>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Root>
	)
}
