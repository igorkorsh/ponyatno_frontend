import { PropsWithChildren, useRef } from "react"
import { IFormProps } from "@/types/dashboard.types"
import { Button } from "@/components/ui/Button"
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/Dialog"

interface IFormWrapperProps {
	title: string
	description?: string
	buttonText: string
	onSubmit: () => void
}

export function FormWrapper({
	children,
	title,
	description = "",
	buttonText,
	onSubmit,
}: PropsWithChildren<IFormWrapperProps>) {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			{children}
			<DialogFooter>
				<Button
					type='submit'
					size='lg'
					className='w-full'
					onClick={onSubmit}
				>
					{buttonText}
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
