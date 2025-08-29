import { SendIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button } from "@/shared/ui/button"
import { Textarea } from "@/shared/ui/textarea"
import { useChatStore } from "../store/chat.store"

export function MessageInput() {
	const { id } = useParams() as { id: string }
	const [message, setMessage] = useState("")
	const { sendMessage } = useChatStore()

	const handleSend = () => {
		if (message.trim()) {
			sendMessage(id, message)
			setMessage("")
		}
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault()
			handleSend()
		}
	}

	return (
		<div className='relative'>
			<Textarea
				value={message}
				onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
					setMessage(event.target.value)
				}
				onKeyDown={handleKeyDown}
				autoComplete='off'
				className='border-brand-600 min-h-4'
			/>
			<Button
				variant='ghost'
				size='icon'
				onClick={handleSend}
				className='text-brand-600 hover:text-brand-700 absolute end-2 bottom-1'
			>
				<SendIcon className='size-5' />
			</Button>
		</div>
	)
}
