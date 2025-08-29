import { SendIcon } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Textarea } from "@/shared/ui/textarea"

export function MessageInput() {
	return (
		<div className='relative'>
			<Textarea
				autoComplete='off'
				className='min-h-4'
			/>
			<Button
				variant='ghost'
				size='icon'
				className='text-brand-600 hover:text-brand-700 absolute end-2 bottom-1'
			>
				<SendIcon className='size-5' />
			</Button>
		</div>
	)
}
