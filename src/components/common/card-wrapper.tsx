import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { Plus } from "lucide-react"
import { type PropsWithChildren } from "react"
import { Button } from "@/components/ui/button"

interface CardWrapperProps {
	title: string
	subtitle?: string
	dialog?: React.ReactNode
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export function CardWrapper({ children, title, dialog, open, onOpenChange }: PropsWithChildren<CardWrapperProps>) {
	return (
		<div className='flex flex-col gap-3'>
			<div className='relative flex flex-col gap-3 rounded-lg bg-neutral-100 p-4 transition-all lg:p-6'>
				{dialog && (
					<Dialog
						open={open}
						onOpenChange={onOpenChange}
					>
						<DialogTrigger asChild>
							<Button
								tabIndex={0}
								variant='ghost'
								className='focus-visible:bg-brand-100 absolute top-2 right-2 size-10 cursor-pointer rounded-full lg:top-4 lg:right-4'
							>
								<Plus className='text-brand-600 hover:text-brand-700 size-6' />
							</Button>
						</DialogTrigger>
						{open && dialog}
					</Dialog>
				)}
				{title && <p className='pe-10 text-lg font-semibold text-neutral-900 lg:ps-2'>{title}</p>}
				{children}
			</div>
		</div>
	)
}
