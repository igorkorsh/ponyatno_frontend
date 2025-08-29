import { useParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { useChatStore } from "../store/chat.store"
import { MessageItem } from "./message-item"

export function MessageList() {
	const { id } = useParams() as { id: string }
	const scrollAreaRef = useRef<HTMLDivElement | null>(null)
	const messageListRef = useRef<HTMLDivElement | null>(null)
	const isInitialLoad = useRef(true)
	const { messages, loadMessages, loadMoreMessages, hasMore } = useChatStore()

	const scrollToBottom = (container: HTMLElement | null, smooth = false) => {
		if (container?.children.length) {
			const lastChild = container.lastChild as HTMLElement

			lastChild.scrollIntoView({
				behavior: smooth ? "smooth" : "auto",
				block: "end",
			})
		}
	}

	const handleScroll = async () => {
		if (!scrollAreaRef.current) return

		const viewport = scrollAreaRef.current.querySelector<HTMLElement>(
			"[data-radix-scroll-area-viewport]",
		)

		if (!viewport) return

		if (viewport.scrollTop === 0 && hasMore) {
			const prevHeight = viewport.scrollHeight
			await loadMoreMessages(id)
			viewport.scrollTop = viewport.scrollHeight - prevHeight
		}
	}

	useEffect(() => {
		loadMessages(id).then(() => {
			scrollToBottom(messageListRef.current)
			isInitialLoad.current = false
		})
	}, [id])

	useEffect(() => {
		if (!isInitialLoad.current) {
			scrollToBottom(messageListRef.current, true)
		}
	}, [messages.length])

	return (
		<ScrollArea
			className='min-h-0'
			ref={scrollAreaRef}
			onScrollCapture={handleScroll}
		>
			<div
				className='flex flex-col gap-4'
				ref={messageListRef}
			>
				{messages.map((message) => (
					<MessageItem
						key={message.id}
						{...message}
					/>
				))}
			</div>
		</ScrollArea>
	)
}
